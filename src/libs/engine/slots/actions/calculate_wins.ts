import BigNumber from "bignumber.js";
import { SlotFeaturesState, SlotSpinWinsState } from "../models/slot_state_model";

export class CalculateWins {

    static AddPays( wins :SlotSpinWinsState[] | SlotFeaturesState[] ) :BigNumber {
        let pay :BigNumber = BigNumber(0);
        wins.forEach( win => {
            pay = pay.plus( win.pay);
        })
        return pay;
    }

}
