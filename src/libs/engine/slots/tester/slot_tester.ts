import BigNumber from "bignumber.js";
import { PayoutTester } from "../../generic/tester/payout-tester";
import { SlotFeaturesState, SlotSpinState, SlotState } from "../models/slot_state_model";

export class SlotTester extends PayoutTester {

    protected state :SlotState

    constructor(){
        super();
        this.createSlotKeys();
    }

    protected createSlotKeys() {    

        this.createPayoutKey("main-spins", "summery", 10);
        this.createPayoutKey("freespin-spins", "summery", 11);

        let priority = 5000;
        for( let s:number=0; s<20; s++){
            for( let oak:number=0; oak<9; oak++){
                this.createPayoutKey( `main-${s}-${oak}oak`, 'mainspin', priority++ );
            }
        }

        for( let s:number=0; s<20; s++){
            for( let oak:number=0; oak<9; oak++){
                this.createPayoutKey( `freespin-${s}-${oak}oak`, 'freespin', priority++ );
            }
        }
    }

    protected recordSlotRTP( state:SlotState) {
        switch( state.gameStatus.action ){
            case "spin":
                this.recordSlotSpinRTP( "main", state.paidSpin[0] );
                break;
            case "freespin" :
                this.recordSlotSpinRTP( "freespin", state.freespins[ state.freespins.length-1 ][0] );
                break;
        }
    }

    protected recordSlotSpinRTP( key :string, state :SlotSpinState) {
        this.updatePayout( `${key}-spins` , state.win );
        this.createPayoutKey( `${key}-reel-${state.reelId}`, "reels", 50);
        this.updateKeyCount( `${key}-reel-${state.reelId}`);
        this.recordSymbolRTP( state, key);
        
        state.features.forEach( feature => {
            this.createPayoutKey( `${key}-${feature.id}`, `feature`, 100 );
            if (feature.isActive) {
                this.updateKeyCount( `${key}-${feature.id}` );
                this.recordFeatureDetils( key, feature );
            }
        });
    }

    protected recordFeatureDetils(key: string, feature: SlotFeaturesState) {
        const p = { "main" : 150, "freespin" : 151 }

        switch( feature.id ) {
            case "mystery":
                this.recordMysteryDetails( key, feature, p[key]);
                break;
        }
    }

    protected recordMysteryDetails(key: string, feature: SlotFeaturesState, priority: number) {
        const pkey :string = `${key}-${feature.id}-symbol-${feature.symbol}`; 
        this.createPayoutKey (pkey , `${key}feature-details`, priority );
        this.updateKeyCount ( pkey);
    }

    protected recordSymbolRTP( state :SlotSpinState , id :string) {
        state.wins.forEach( win => {
            const key = `${id}-${win.symbol}-${win.offsets.length}oak`;
            this.updatePayout( key , win.pay);
        });
    }

    protected calculateGameRTP(){
        if ( this.state.gameStatus.action == "spin" ) {
            this.updateTotalBetAndWin( this.state.gameStatus.totalBet, new BigNumber(0));
        }
        this.updateTotalBetAndWin( new BigNumber(0), this.state.gameStatus.currentWin);
    }
    
}
