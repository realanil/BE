import { BaseSlotGame } from "../../libs/platform/slots/base_slot_game";
import { SlotFeaturesState, SlotSpinState } from "../../libs/engine/slots/models/slot_state_model";
import { PlayResponseModel } from "../../libs/platform/slots/play_response_model";
import { ResponseModel } from "../../libs/platform/base/response_model";
import { ConfigResponseV2Model } from "../../libs/platform/slots/responses_v2";
import BigNumber from "bignumber.js";
import { VikingMath } from "./models/viking_math";
import { VikingConfigResponseV2Model, VikingResponseModel } from "./models/viking_response";
import { VikingState } from "./models/viking_state";
import { RandomHelper } from "../../libs/engine/slots/utils/random";
import { CreateStops } from "../../libs/engine/slots/actions/create_stops";
import { CreateGrid } from "../../libs/engine/slots/actions/create_grid";
import { EvaluateWins } from "../../libs/engine/slots/actions/evaluate_wins";
import { CalculateWins } from "../../libs/engine/slots/actions/calculate_wins";
import { SpinCondition } from "../../libs/engine/slots/conditions/spin_condition";
import { Triggerer } from "../../libs/engine/slots/features/triggerer";
import { Symbols } from "../../libs/engine/slots/utils/symbols";
import { Grid } from "../../libs/engine/slots/utils/grid";
import { Cloner } from "../../libs/engine/slots/utils/cloner";
import { UpdateFeature } from "../../libs/engine/slots/features/update_feature";
import { SlotConditionMath } from "../../libs/engine/slots/models/slot_math_model";
import { ScatterSymbolCount } from "../../libs/engine/slots/conditions/scatter_symbol_count";


export class GameServer extends BaseSlotGame {

    constructor(){
        super("Vikinng", "0.7");
        this.math = new VikingMath();
    }

    protected executeBaseSpin() {
        let state:SlotSpinState = new SlotSpinState();
        
        const selectedSet:any = RandomHelper.GetRandomFromList( this.rng, this.math.paidReels );
        state.reelId = selectedSet.id;
        state.stops = CreateStops.StandardStops(this.rng, selectedSet.reels, this.math.info.gridLayout );
        state.initialGrid = CreateGrid.StandardGrid( selectedSet.reels, state.stops);
        state.finalGrid = this.replaceRandomSymbol( state.initialGrid);

        state.wins = EvaluateWins.LineWins( this.math.info, state.finalGrid, this.state.gameStatus.stakeValue );
        state.win = CalculateWins.AddPays( state.wins );

        const multipliers:any = RandomHelper.GetRandomFromList( this.rng, this.math.collection["multiplies"]);
        state.multipliers = multipliers.id.split("-").map( v => parseInt(v));

        (this.state as VikingState).scatterCount = Grid.FindScatterOffsets( 11, state.initialGrid).length;

        const freespin:SlotFeaturesState = new SlotFeaturesState();
        freespin.id = this.math.conditions["FreespinTrigger"].id;

        const holdspin:SlotFeaturesState = SpinCondition.WinCondition( this.math.conditions["HoldSpin"]  , state)
        holdspin.offsets = Symbols.UniqueWinningSymbols( state.wins);
        const winreels :boolean[] = Symbols.WinningReelsByOffsets( holdspin.offsets, this.math.info.gridLayout );
        for(let i=0; i<winreels.length; i++) {
            if (!winreels[i]) {
                break;
            }
            state.multiplier = state.multipliers[i];
        }
        (this.state as VikingState).activeReels = winreels;

        if (holdspin.isActive) {
            holdspin.offsets = Symbols.UniqueWinningSymbols( state.wins);
            Triggerer.UpdateFeature(this.state, holdspin, this.math.actions["RespinTrigger"]); 
            Triggerer.UpdateNextAction( this.state, this.math.actions["RespinTrigger"]);
            this.state.respin.accumulated = state.win;
            state.win = BigNumber(0);
        } else {
            const freespinContition : SlotConditionMath = this.math.conditions["FreespinTrigger"];
            if ((this.state as VikingState).scatterCount >= freespinContition.minCount ) {
                freespin.isActive = true;
                freespin.symbol = freespinContition.symbol;
                Triggerer.UpdateFeature(this.state, freespin, this.math.actions["FreespinTrigger"]); 
                Triggerer.UpdateNextAction( this.state, this.math.actions["FreespinTrigger"]);

                const extra = (this.state as VikingState).scatterCount - freespinContition.minCount; 
                freespin.count += extra*5;  
                this.state.freespin.total = freespin.count; 
                this.state.freespin.left = freespin.count; 
            }
        }

        state.features = [holdspin, freespin]

        this.state.gameStatus.currentWin = new BigNumber(0);
        this.state.gameStatus.totalWin = new BigNumber(0);
        this.state.paidSpin = [state];
    }

    protected executeBuyBonus() {
        let state:SlotSpinState = new SlotSpinState();         
        const bbAward:any = RandomHelper.GetRandomFromList( this.rng, this.math.collection["BuyBonusAward"]);
        
        const condition:SlotConditionMath = new SlotConditionMath();
        condition.oak = [bbAward.count];
        condition.symbol = 11;

        const selectedSet:any = RandomHelper.GetRandomFromList( this.rng, this.math.paidReels );
        state.reelId = selectedSet.id;

        state.stops = CreateStops.StandardStops(this.rng, selectedSet.reels, this.math.info.gridLayout );
        state.initialGrid = CreateGrid.StandardGrid( selectedSet.reels, state.stops);
        state.finalGrid = this.replaceRandomSymbol( state.initialGrid);

        state.wins = EvaluateWins.LineWins( this.math.info, state.finalGrid, this.state.gameStatus.stakeValue );
        state.win = CalculateWins.AddPays( state.wins );

        const multipliers:any = RandomHelper.GetRandomFromList( this.rng, this.math.collection["multiplies"]);
        state.multipliers = multipliers.id.split("-").map( v => parseInt(v));
        (this.state as VikingState).activeReels = [false, false, false, false, false];
        
        let feature = ScatterSymbolCount.checkCondition( this.math.conditions["FreespinTrigger"], state );
        while( !feature.isActive || state.win.isGreaterThan(0) ){
            state.stops = CreateStops.StandardStops(this.rng, selectedSet.reels, this.math.info.gridLayout );
            state.initialGrid = CreateGrid.StandardGrid( selectedSet.reels, state.stops);
            state.finalGrid = this.replaceRandomSymbol( state.initialGrid);

            state.wins = EvaluateWins.LineWins( this.math.info, state.finalGrid, this.state.gameStatus.stakeValue );
            state.win = CalculateWins.AddPays( state.wins );

            feature = ScatterSymbolCount.checkCondition( this.math.conditions["FreespinTrigger"], state );
        }

        (this.state as VikingState).scatterCount = Grid.FindScatterOffsets( 11, state.initialGrid).length;
        Triggerer.UpdateFeature(this.state, feature, this.math.actions["FreespinTrigger"]); 
        Triggerer.UpdateNextAction( this.state, this.math.actions["FreespinTrigger"]);

        const extra = (this.state as VikingState).scatterCount - this.math.conditions["FreespinTrigger"].minCount; 
        feature.count += extra*5;  
        this.state.freespin.total = feature.count; 
        this.state.freespin.left = feature.count; 

        state.features = [feature]

        this.state.gameStatus.currentWin = new BigNumber(0);
        this.state.gameStatus.totalWin = new BigNumber(0);
        this.state.paidSpin = [state];

    }

    protected executeReSpin() {
        const prevState :SlotSpinState = this.state.respins.length === 0 ? this.state.paidSpin[0] : this.state.respins[this.state.respins.length-1][0]

        let state:SlotSpinState = new SlotSpinState();

        const selectedSet:any = RandomHelper.GetRandomFromList( this.rng, this.math.reSpinReels );
        state.reelId = selectedSet.id;
        state.stops = CreateStops.StandardStops(this.rng, selectedSet.reels, this.math.info.gridLayout );
        state.initialGrid = CreateGrid.StandardGrid( selectedSet.reels, state.stops);
        state.initialGrid = Grid.UpdateSymbolsInOffsetsWithPrevGrid( prevState.features[0].offsets, state.initialGrid, prevState.finalGrid );
        state.finalGrid = this.replaceRandomSymbol( state.initialGrid);

        state.wins = EvaluateWins.LineWins( this.math.info, state.finalGrid, this.state.gameStatus.stakeValue );
        state.win = CalculateWins.AddPays( state.wins );

        state.multipliers = prevState.multipliers;
        state.prevMultiplier = prevState.multiplier;

        (this.state as VikingState).scatterCount += Grid.FindScatterOffsets( 11, state.initialGrid).length;

        UpdateFeature.updateReSpinCount( this.state);

        const freespin:SlotFeaturesState = new SlotFeaturesState();
        freespin.id = this.math.conditions["FreespinTrigger"].id;

        const holdspin:SlotFeaturesState = new SlotFeaturesState();
        holdspin.id = this.math.conditions["HoldSpin"].id;

        holdspin.isActive = state.win.isGreaterThan( new BigNumber(this.state.respin.accumulated) );
        holdspin.offsets = Symbols.UniqueWinningSymbols( state.wins);
        const winreels :boolean[] = Symbols.WinningReelsByOffsets( holdspin.offsets, this.math.info.gridLayout );
        (this.state as VikingState).activeReels = new Array(5).fill( false);
        for(let i=0; i<winreels.length; i++) {
            if (!winreels[i]) {
                break;
            }
            (this.state as VikingState).activeReels[i] = true;
            state.multiplier = state.multipliers[i];
        }

        if (holdspin.isActive) {
            Triggerer.UpdateFeature(this.state, holdspin, this.math.actions["RespinTrigger"]); 
            Triggerer.UpdateNextAction( this.state, this.math.actions["RespinTrigger"]);
            this.state.respin.accumulated = state.win;
            this.state.gameStatus.currentWin = new BigNumber(0);
            this.state.gameStatus.totalWin = new BigNumber(0);  
            state.win = BigNumber(0);
        } else { 

            state.win = state.win.multipliedBy( state.multiplier);
            this.state.gameStatus.currentWin = state.win;
            this.state.gameStatus.totalWin = state.win;
            this.state.respin.accumulated = new BigNumber(0);

            const freespinContition : SlotConditionMath = this.math.conditions["FreespinTrigger"];
            if ((this.state as VikingState).scatterCount >= freespinContition.minCount ) {
                freespin.isActive = true;
                freespin.symbol = freespinContition.symbol;
                Triggerer.UpdateFeature(this.state, freespin, this.math.actions["FreespinTrigger"]); 
                Triggerer.UpdateNextAction( this.state, this.math.actions["FreespinTrigger"]);

                const extra = (this.state as VikingState).scatterCount - freespinContition.minCount; 
                freespin.count += extra*5;  
                this.state.freespin.total = freespin.count; 
                this.state.freespin.left = freespin.count; 
            }
        }

        holdspin.isActive = true;

        state.features = [holdspin, freespin];        
        
        this.state.respins.push([state]);
    }

    protected executeFreeSpin() {
        let state:SlotSpinState = new SlotSpinState();

        const selectedSet:any = RandomHelper.GetRandomFromList( this.rng, this.math.freeReels );
        state.reelId = selectedSet.id;
        state.stops = CreateStops.StandardStops(this.rng, selectedSet.reels, this.math.info.gridLayout );
        state.initialGrid = CreateGrid.StandardGrid( selectedSet.reels, state.stops);
        state.finalGrid = this.replaceRandomSymbol( state.initialGrid);

        state.wins = EvaluateWins.LineWins( this.math.info, state.finalGrid, this.state.gameStatus.stakeValue );
        state.win = CalculateWins.AddPays( state.wins );

        const multipliers:any = RandomHelper.GetRandomFromList( this.rng, this.math.collection["multiplies"]);
        state.multipliers = multipliers.id.split("-").map( v => parseInt(v));

        const holdspin:SlotFeaturesState = SpinCondition.WinCondition( this.math.conditions["HoldSpin"]  , state)
        holdspin.offsets = Symbols.UniqueWinningSymbols( state.wins);
        const winreels :boolean[] = Symbols.WinningReelsByOffsets( holdspin.offsets, this.math.info.gridLayout );
        state.multiplier = 0;
        for(let i=0; i<winreels.length; i++) {
            if (winreels[i]) {
                state.multiplier += state.multipliers[i];
            }
        }
        state.multiplier = state.multiplier == 0 ? 1 : state.multiplier;
        (this.state as VikingState).activeReels = winreels;

        if (holdspin.isActive) {
            Triggerer.UpdateFeature(this.state, holdspin, this.math.actions["FreeRespinTrigger"]); 
            Triggerer.UpdateNextAction( this.state, this.math.actions["FreeRespinTrigger"]);
            this.state.freerespin.accumulated = state.win;
            state.win = BigNumber(0);
        } else {
            UpdateFeature.updateFreeSpinCount( this.state);
        }

        state.features = [holdspin]
        this.state.paidSpin = [state];

        this.state.gameStatus.currentWin = new BigNumber(0);
        this.state.freespins.push( [state] );
        
    }

    protected executeFreeReSpin() {
        const prevState :SlotSpinState = this.state.freerespins.length === 0 
                                            ? this.state.freespins [this.state.freespins.length-1] [0] 
                                            : this.state.freerespins [this.state.freerespins.length-1] [0]

        let state:SlotSpinState = new SlotSpinState();

        const selectedSet:any = RandomHelper.GetRandomFromList( this.rng, this.math.freeReSpinReels );
        state.reelId = selectedSet.id;
        state.stops = CreateStops.StandardStops(this.rng, selectedSet.reels, this.math.info.gridLayout );
        state.initialGrid = CreateGrid.StandardGrid( selectedSet.reels, state.stops);
        state.initialGrid = Grid.UpdateSymbolsInOffsetsWithPrevGrid( prevState.features[0].offsets, state.initialGrid, prevState.finalGrid );
        state.finalGrid = this.replaceRandomSymbol( state.initialGrid);

        state.wins = EvaluateWins.LineWins( this.math.info, state.finalGrid, this.state.gameStatus.stakeValue );
        state.win = CalculateWins.AddPays( state.wins );

        state.multipliers = prevState.multipliers;
        state.prevMultiplier = prevState.multiplier;

        UpdateFeature.updateFreeReSpinCount( this.state);

        const holdspin:SlotFeaturesState = new SlotFeaturesState();
        holdspin.id = this.math.conditions["HoldSpin"].id;

        holdspin.isActive = state.win.isGreaterThan( new BigNumber(this.state.freerespin.accumulated) );
        holdspin.offsets = Symbols.UniqueWinningSymbols( state.wins);
        const winreels :boolean[] = Symbols.WinningReelsByOffsets( holdspin.offsets, this.math.info.gridLayout );
        state.multiplier = 0;
        for(let i=0; i<winreels.length; i++) {
            if (winreels[i]) {
                state.multiplier += state.multipliers[i];
            }
        }
        state.multiplier = state.multiplier == 0 ? 1 : state.multiplier;
        (this.state as VikingState).activeReels = winreels;

        if (holdspin.isActive) {
            Triggerer.UpdateFeature(this.state, holdspin, this.math.actions["FreeRespinTrigger"]); 
            Triggerer.UpdateNextAction( this.state, this.math.actions["FreeRespinTrigger"]);
            this.state.gameStatus.currentWin = new BigNumber(0); 
            this.state.freerespin.accumulated = state.win;
            state.win = BigNumber(0);
        } else { 
            state.win = state.win.multipliedBy( state.multiplier);
            this.state.gameStatus.currentWin = state.win;
            this.state.freerespin.accumulated = new BigNumber(0);
            this.state.gameStatus.totalWin = new BigNumber(this.state.gameStatus.totalWin).plus(state.win);

            UpdateFeature.updateFreeSpinCount( this.state);
        }

        holdspin.isActive = true;
        state.features = [holdspin];  
        
        this.state.freerespins.push([state]);
    }

    protected getPlayResponse():ResponseModel {
        return new VikingResponseModel( this.version, this.name, this.math, this.state as VikingState);
    }

    protected getConfigResponse( response:PlayResponseModel):ResponseModel {
        return new VikingConfigResponseV2Model( this.version, this.name, this.math, this.state as VikingState);
    }

    protected defaultEmptyState():VikingState {
        return new VikingState()
    }

    protected replaceRandomSymbol( grid :number[][]) :number[][] {
        let newGrid = Cloner.CloneGrid( grid);
        const reel1Offsets = Grid.FindScatterOffsetsInReels( 12, [0], newGrid);
        if (reel1Offsets.length > 0) {
            const randomSymbols = [];
            newGrid[1].forEach( symbol => {
                if ( symbol !== 11 && symbol !== 12 ) {
                    randomSymbols.push( { weight : 1, symbol : symbol } );
                }
            })
            const symbol :any = RandomHelper.GetRandomFromList( this.rng, randomSymbols);
            newGrid = Grid.ReplaceSymbolsInOffsets( reel1Offsets, newGrid, symbol.symbol);
        }

        const reel23Offsets = Grid.FindScatterOffsetsInReels( 12, [1, 2], newGrid);
        if (reel23Offsets.length > 0) {
            const randomSymbols = [];
            newGrid[0].forEach( symbol => {
                if ( symbol !== 11 && symbol !== 12 ) {
                    randomSymbols.push( { weight : 1, symbol : symbol } );
                }
            })
            const symbol :any = RandomHelper.GetRandomFromList( this.rng, randomSymbols);
            newGrid = Grid.ReplaceSymbolsInOffsets( reel23Offsets, newGrid, symbol.symbol);
        }

        return newGrid;

    }

}
