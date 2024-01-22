import BigNumber from "bignumber.js";
import { LineWinEvaluator } from "../evaluator/line_win_evaluator";
import { SlotFeaturesState, SlotSpinWinsState } from "../models/slot_state_model";
import { SlotInfoMath } from "../models/slot_math_model";
import { WaysWinEvaluator } from "../evaluator/ways_win_evaluator";

export class EvaluateWins {

    static LineWins( info :SlotInfoMath, grid:number[][], stake :BigNumber ) :SlotSpinWinsState[] {
        const evaluator :LineWinEvaluator = new LineWinEvaluator();

        const payouts :SlotSpinWinsState[] = [];
        info.payLines.forEach( (offsets :number[], line :number) => {
            const payout :SlotSpinWinsState = evaluator.calculateWins(info, grid, line, stake);
            if (payout != null && payout.pay.isGreaterThan(0)) {
                payouts.push(payout);
            }
        });

        return payouts;
    }

    static WaysWins( info :SlotInfoMath, grid:number[][], stake :BigNumber, multiplier:number ) :SlotSpinWinsState[] {
        const evaluator :WaysWinEvaluator = new WaysWinEvaluator();

        const payouts :SlotSpinWinsState[] = evaluator.calculateWins( info, grid, stake, multiplier ) ;
        
        return payouts;
    }


    static FeatureWins( info:SlotInfoMath, feature:SlotFeaturesState, stake:BigNumber, multiplier:number=1 ) {
        if (feature.isActive){
            const symbol = info.symbols.find( s => s.id === feature.symbol );
            if (symbol !== null && symbol.payout.length > 0) {
                const pay :BigNumber = symbol.payout[ feature.offsets.length ];
                feature.pay = pay.multipliedBy( stake).multipliedBy( multiplier);
            }
        }
        return feature;
    }



}
