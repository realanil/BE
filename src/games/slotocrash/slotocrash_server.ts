import BigNumber from "bignumber.js";
import { BaseSlotGame } from "../../libs/platform/slots/base_slot_game";
import { SlotocrashState } from "./models/slotocrash_state";
import { SlotFeaturesState, SlotSpinState } from "../../libs/engine/slots/models/slot_state_model";
import { CreateGrid } from "../../libs/engine/slots/actions/create_grid";
import { Cloner } from "../../libs/engine/slots/utils/cloner";
import { CustomGrid } from "./actions/custom_grid";
import { CustomWins } from "./actions/custom_wins";
import { CalculateWins } from "../../libs/engine/slots/actions/calculate_wins";
import { SlotocrashMath } from "./models/slotocrash_math";
import { SpinCondition } from "../../libs/engine/slots/conditions/spin_condition";
import { Triggerer } from "../../libs/engine/slots/features/triggerer";
import { UpdateFeature } from "../../libs/engine/slots/features/update_feature";


export class SlotocrashServer extends BaseSlotGame {

    constructor(){
        super("Slotocrash", "0.1");
        
        this.state = new SlotocrashState();
        this.math = new SlotocrashMath();
    }

    protected executeBaseSpin() {
        let state:SlotSpinState = new SlotSpinState();
        state.initialGrid = CreateGrid.WeightedSymbolGrid(this.rng, this.math.paidReels[0].symbols, this.math.info.gridLayout);
        CustomGrid.AddBlastSymbol( this.rng, state, this.math as SlotocrashMath);
        state.finalGrid = Cloner.CloneGrid( state.initialGrid);
        state.wins = CustomWins.EvaluateWin( state.finalGrid, this.state.gameStatus.stakeValue, this.math as SlotocrashMath);
        state.win = CalculateWins.AddPays( state.wins );
        state.win = state.win.multipliedBy( state.multiplier);

        const feature :SlotFeaturesState = SpinCondition.WinCondition( this.math.conditions[0], state);
        if ( feature.isActive ) {
            state.win = state.win.plus( this.state.gameStatus.totalBet); 
            Triggerer.UpdateFeature( this.state, feature, this.math.actions[0] );
            Triggerer.UpdateNextAction( this.state, this.math.actions[0]);
            this.state.freespin.accumulated = state.win;
        }

        this.state.paidSpin.push( state);

        this.state.gameStatus.currentWin = new BigNumber(0);
        this.state.gameStatus.totalWin = new BigNumber(0);
    }

    protected executeCollect() {
        let state:SlotSpinState = this.state.paidSpin[0];
        state.wins = [];
        state.win = new BigNumber(0);

        this.state.gameStatus.currentWin = this.state.freespin.accumulated;
        this.state.gameStatus.totalWin = this.state.freespin.accumulated;

        this.state.gameStatus.nextAction = ["freespin"];
        (this.state as SlotocrashState).isCollected  = true;

    }

    protected executeFreeSpin() {
        let state:SlotSpinState = this.state.paidSpin[0];
        const previn = this.state.freespin.accumulated;
        const stake = this.state.gameStatus.stakeValue;
        CustomGrid.AddNewReel( this.rng, state, this.math as SlotocrashMath, Number(previn));
        state.finalGrid = Cloner.CloneGrid( state.initialGrid);
        state.wins = CustomWins.EvaluateNewReelWin( state.finalGrid, new BigNumber(stake), this.math as SlotocrashMath);
        state.win = CalculateWins.AddPays( state.wins );
        state.multiplier += 1;
        state.win = state.win.multipliedBy( state.multiplier);
        
        this.state.freespin.accumulated = new BigNumber(previn).plus( state.win);
        const feature :SlotFeaturesState = SpinCondition.WinCondition( this.math.conditions[0], state);
        if ( feature.isActive ) {
            Triggerer.UpdateFeature( this.state, feature, this.math.actions[1] );
            Triggerer.UpdateNextAction( this.state, this.math.actions[1]);
        }
        UpdateFeature.updateFreeSpinCount( this.state);
        if ( (this.state as SlotocrashState).isCollected  === true){
            this.state.gameStatus.nextAction = ["freespin"];
        }

        if (this.state.freespin.left === 0) {
            // this.state.freespin.accumulated = new BigNumber(0);
            this.state.gameStatus.nextAction = ["spin"];
        }

    }

}
