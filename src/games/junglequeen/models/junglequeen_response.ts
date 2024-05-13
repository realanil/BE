import { SlotSpinState, SlotState } from "../../../libs/engine/slots/models/slot_state_model";
import { PlatformMath } from "../../../libs/platform/base/platform_math";
import { ConfigResponseV2Model, PlayResponseV2Model } from "../../../libs/platform/slots/responses_v2";
import { JungleQueenState } from "./junglequeen_state";

export class JungleQueenResponseModel extends PlayResponseV2Model {

    constructor( version:string, name:string, math:PlatformMath, state:JungleQueenState ) {
        super( version, name, math, state);
        if (state.gameStatus.action == "freespin") {
            this.state["totalNumMysterySym"] = state.mystrySymbolCount;
            this.state["level"] = state.mystryLevel;
            this.state["prevlevel"] = state.prevMystryLevel;
        }
        const playerAction:string = state.gameStatus.action === "buybonus" ? "spin" : state.gameStatus.action;
        const spins:SlotSpinState = playerAction === "spin" ? state.paidSpin[0]:state.freespins[ state.freespins.length-1][0];
        spins.features.forEach( feature => {
            if (feature.isActive && feature.id == "mystery") 
                this.state["currentMysterySym"] = feature.offsets.length;
        })        
    }
}


export class JungleQueenConfigResponseV2Model extends ConfigResponseV2Model {

    constructor( version:string, name:string, math:PlatformMath, state:JungleQueenState ) {
        super( version, name, math, state);
        if (state.gameStatus.action == "freespin") {
            this.state["totalNumMysterySym"] = state.mystrySymbolCount;
            this.state["level"] = state.mystryLevel;
            this.state["prevlevel"] = state.prevMystryLevel;
        }
        const playerAction:string = ["spin", "buybonus", ""].includes(state.gameStatus.action) ? "spin" : state.gameStatus.action;
        const spins:SlotSpinState = playerAction === "spin"  ? state.paidSpin[0]:state.freespins[ state.freespins.length-1][0];
        spins?.features.forEach( feature => {
            if (feature.isActive && feature.id == "mystery") 
                this.state["currentMysterySym"] = feature.offsets.length;
        })        
    }
}

