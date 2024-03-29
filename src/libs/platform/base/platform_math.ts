import BigNumber from "bignumber.js";
import { SlotMath } from "../../engine/slots/models/slot_math_model";

export class PlatformMath extends SlotMath {

    public gameConfig:GameConfig = new GameConfig();

    public defaultBet:number = 0.05;
    public bets:number[] = [ 0.01, 0.02, 0.04, 0.05, 0.1, 0.25, 0.5, 1 ];
    public payScreenThresholds:number[] = [20, 50, 120];
    public autoPlayValues:number[] = [5, 10, 20, 50];
    public maxCoins:number = 25000;
}

class GameConfig {
    public type:string = "PAYLINES";
    public payDirection:string = "LEFT"
    public freespins:boolean = true;
    public disableBuyIn:boolean = false;
}

