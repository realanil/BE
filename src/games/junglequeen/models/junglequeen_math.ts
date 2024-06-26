import BigNumber from "bignumber.js";
import { PlatformMath } from "../../../libs/platform/base/platform_math";

export class JungleQueenMath extends PlatformMath {

    public goldSymbolId:number = 14;
    public mystrySymbolId:number = 13;

    public goldMultiplier:GoldSets[] = [];

    constructor(){
        super();

        this.defaultgrid = [
            [8, 12, 9],
            [6, 4, 2],
            [7, 7, 5],
            [4, 7, 2],
            [12, 11, 4]
        ];
        this.info = {
            betMultiplier:new BigNumber(20),
            gridLayout:[3, 3, 3, 3, 3],
            wildSymbols:[0],
            skipEval:[],
            payLines:[
                [1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0],
                [2, 2, 2, 2, 2],
                [0, 1, 2, 1, 0],
                [2, 1, 0, 1, 2],
                [1, 0, 0, 0, 1],
                [1, 2, 2, 2, 1],
                [0, 0, 1, 2, 2],
                [2, 2, 1, 0, 0],
                [1, 2, 1, 0, 1],
                [1, 0, 1, 2, 1],
                [0, 1, 1, 1, 0],
                [2, 1, 1, 1, 2],
                [0, 1, 0, 1, 0],
                [2, 1, 2, 1, 2],
                [1, 1, 0, 1, 1],
                [1, 1, 2, 1, 1],
                [0, 0, 2, 0, 0],
                [2, 2, 0, 2, 2],
                [0, 2, 2, 2, 0]
            ],
            symbols:[
                { name:"wild", key:"WILD", id:0, payout:[ this.bd(0), this.bd(0), this.bd(2), this.bd(20), this.bd(50), this.bd(500)] },
                { name:"HV1", key:"HIGH", id:1, payout:[ this.bd(0), this.bd(0), this.bd(2), this.bd(20), this.bd(50), this.bd(500)] },
                { name:"HV2", key:"HIGH", id:2, payout:[ this.bd(0), this.bd(0), this.bd(2), this.bd(10), this.bd(30), this.bd(150)] },
                { name:"HV3", key:"HIGH", id:3, payout:[ this.bd(0), this.bd(0), this.bd(2), this.bd(10), this.bd(30), this.bd(100)] },
                { name:"HV4", key:"HIGH", id:4, payout:[ this.bd(0), this.bd(0), this.bd(2), this.bd(10), this.bd(30), this.bd(90)] },
                { name:"HV5", key:"HIGH", id:5, payout:[ this.bd(0), this.bd(0), this.bd(2), this.bd(10), this.bd(30), this.bd(80)] },
                { name:"LV1", key:"LOW", id:6, payout:[ this.bd(0), this.bd(0), this.bd(0), this.bd(5), this.bd(20), this.bd(50)] },
                { name:"LV2", key:"LOW", id:7, payout:[ this.bd(0), this.bd(0), this.bd(0), this.bd(5), this.bd(20), this.bd(50)] },
                { name:"LV3", key:"LOW", id:8, payout:[ this.bd(0), this.bd(0), this.bd(0), this.bd(5), this.bd(20), this.bd(50)] },
                { name:"LV4", key:"LOW", id:9, payout:[ this.bd(0), this.bd(0), this.bd(0), this.bd(5), this.bd(20), this.bd(50)] },
                { name:"LV5", key:"LOW", id:10, payout:[ this.bd(0), this.bd(0), this.bd(0), this.bd(5), this.bd(20), this.bd(50)] },
                { name:"LV6", key:"LOW", id:11, payout:[ this.bd(0), this.bd(0), this.bd(0), this.bd(5), this.bd(20), this.bd(50)] },
                { name:"scatter", key:"SCATTER", id:12, payout:[] },
                { name:"mystery", key:"TRANSFORM", id:this.mystrySymbolId, payout:[] },
                { name:"gold", key:"GOLD", id:this.goldSymbolId, payout:[]}
            ]
        };

        this.buyBonus = [ { "id" : "buybonus", "cost" : 100 }];

        this.paidReels = [{
            id: "b1",
            weight: 475,
            reels: [
                [7, 6, 5, 11, 6, 10, 12, 8, , 9, 7, 11, 11, 4, 7, 9, 1, 7, 11, 8, 12, 7, 3, 3, 11, 10, 6, 6, 7, 12, 9, 11, 10, 3, 8, 6, 11, 3, 7, 8, 4, 11, 10, 6, 12, 9, 8, 10, 4, 8, 4, 11, 9, 8, 12, 9, 9, 5, 11, 4, 4, 8, 9, 0, 10, 10, 11, 5, 9, 8, 9, 12, 7, 3, 2, 8, 11, 9, 3, 2, 6, 2, 9, 11, 2, 10, 5, 7, 6, 12, 6, 4, 11, 10, 4, 6, 5, 10, 11, 8, 5, 3, 10, 8, 6, 12, 7, 10, 1, 4, 7, 10, 3, 9, 5, 2, 6, 9, 12, 6, 3, 7, 5, 5, 10, 7, 12, 8, 7, 8, 2, 9, 10, 6, 1, 8, 7, 6],
                [3, 1, 4, 6, 5, 3, 4, 0, 3, 10, 6, 2, 3, 5, 2, 2, 11, 6, 3, 4, 3, 4, 6, 5, 8, 10, 0, 6, 2, 11, 5, 4, 8, 2, 6, 6, 7, 5, 7, 4, 4, 6, 1, 5, 4, 5, 1, 3, 5, 3, 2, 2, 6, 6, 4, 11, 1, 3, 9, 5, 5, 5, 4, 5, 2, 5, 9, 3, 3, 6, 4, 2, 4, 5, 2, 6, 4, 2, 1, 6, 6, 4, 5, 1, 1, 3, 6, 7, 1, 2, 4, 5, 6, 6, 3, 10, 4, 4, 3, 3, 4, 5, 3, 4, 2, 5, 2, 1, 4, 2, 5, 2, 2, 5, 8, 3, 5, 4, 5, 4, 3, 3, 4, 2, 3, 4, 3, 5, 6, 4, 4, 3, 3, 3, 4, 5, 5, 3, 5, 5, 9, 3, 3],
                [6, 9, 12, 6, 8, 3, 9, 11, 11, 8, 7, 3, 7, 5, 6, 6, 11, 5, 8, 3, 8, 12, 9, 2, 11, 1, 8, 10, 12, 8, 4, 2, 11, 10, 6, 7, 10, 12, 11, 7, 10, 7, 0, 7, 3, 11, 4, 9, 8, 5, 10, 12, 7, 10, 10, 11, 7, 7, 0, 8, 6, 11, 1, 8, 6, 3, 7, 6, 0, 4, 4, 4, 11, 10, 6, 12, 7, 2, 5, 11, 8, 6, 12, 9, 9, 8, 4, 11, 7, 8, 9, 5, 9, 11, 5, 9, 10, 0, 4, 4, 5, 11, 3, 7, 6, 9, 3, 8, 9, 11, 3, 10, 6, 12, 10, 6, 2, 10, 9, 6, 12, 9, 9, 9, 10, 1, 8, 2, 6, 7, 7, 5, 3, 10, 2, 8, 5, 4, 10],
                [4, 10, 3, 7, 5, 2, 1, 2, 7, 6, 2, 11, 5, 4, 7, 3, 10, 3, 3, 7, 5, 4, 3, 5, 5, 7, 7, 1, 4, 3, 2, 5, 3, 7, 7, 5, 2, 3, 5, 3, 2, 11, 6, 2, 5, 7, 7, 4, 3, 4, 2, 3, 7, 11, 5, 4, 3, 3, 3, 9, 2, 7, 1, 10, 8, 9, 4, 4, 7, 2, 5, 5, 5, 2, 4, 7, 4, 6, 1, 1, 3, 4, 7, 5, 9, 5, 5, 1, 0, 3, 2, 4, 4, 4, 7, 5, 5, 4, 4, 8, 2, 3, 5, 3, 1, 8, 4, 2, 4, 3, 3, 2, 4, 4, 3, 5, 7, 3, 2, 5, 0, 2, 5, 3, 4, 4, 1, 4, 1, 3, 4, 3, 2, 5, 3, 4, 5, 5, 7, 4, 5, 3, 5],
                [8, 7, 10, 6, 11, 2, 10, 12, 10, 9, 1, 9, 8, 11, 11, 11, 5, 6, 1, 5, 7, 11, 4, 8, 10, 9, 6, 12, 9, 8, 11, 9, 6, 9, 12, 6, 3, 11, 7, 7, 0, 10, 3, 11, 8, 7, 1, 11, 4, 6, 6, 3, 10, 9, 12, 10, 11, 9, 3, 7, 9, 12, 9, 8, 11, 4, 5, 4, 2, 11, 8, 9, 3, 7, 11, 4, 4, 6, 7, 12, 6, 8, 10, 2, 11, 9, 6, 10, 5, 5, 0, 4, 7, 9, 4, 11, 8, 10, 10, 10, 7, 3, 8, 5, 9, 7, 3, 4, 8, 3, 6, 5, 3, 2, 10, 8, 8, 7, 7, 8, 6, 5, 5, 6, 9, 10, 7, 2, 10, 2, 7, 6, 6, 8]
            ]
        }, {
            id: "b2",
            weight: 525,
            reels:[
                [3, 1, 4, 6, 5, 3, 4, 0, 3, 10, 12, 6, 2, 3, 5, 2, 2, 11, 6, 3, 4, 3, 4, 6, 5, 8, 12, 10, 6, 2, 11, 5, 4, 8, 2, 6, 6, 12, 7, 5, 7, 4, 4, 6, 1, 5, 4, 5, 12, 1, 3, 5, 3, 2, 2, 6, 6, 4, 11, 1, 3, 9, 5, 5, 5, 4, 5, 2, 12, 5, 9, 3, 3, 6, 4, 2, 12, 4, 5, 2, 6, 4, 2, 1, 6, 6, 4, 5, 12, 1, 1, 3, 6, 7, 1, 2, 4, 5, 6, 6, 3, 10, 4, 4, 3, 3, 12, 4, 5, 3, 4, 2, 5, 12, 2, 1, 4, 2, 5, 2, 2, 5, 8, 3, 5, 4, 5, 4, 12, 3, 3, 4, 2, 3, 4, 3, 5, 6, 4, 4, 3, 3, 3, 4, 5, 5, 3, 5, 5, 9, 3, 3],
                [7, 6, 5, 11, 6, 10, 8, 9, 7, 11, 11, 4, 7, 9, 1, 7, 11, 8, 7, 3, 3, 11, 10, 6, 6, 7, 0, 9, 11, 10, 3, 8, 6, 11, 3, 7, 8, 4, 11, 10, 6, 9, 8, 10, 4, 8, 4, 11, 9, 8, 9, 9, 5, 11, 4, 4, 8, 9, 0, 10, 10, 11, 5, 9, 8, 9, 7, 3, 2, 8, 11, 9, 3, 2, 6, 2, 9, 11, 2, 10, 5, 7, 6, 6, 4, 11, 10, 4, 6, 5, 10, 11, 8, 5, 3, 10, 8, 6, 7, 10, 1, 4, 7, 10, 3, 9, 5, 2, 6, 9, 6, 3, 7, 5, 5, 10, 7, 8, 7, 8, 2, 9, 10, 6, 1, 8, 7, 6],
                [4, 10, 3, 7, 5, 2, 1, 2, 7, 12, 6, 2, 11, 5, 4, 7, 3, 10, 3, 3, 7, 5, 4, 3, 5, 5, 7, 12, 7, 1, 4, 3, 2, 5, 3, 7, 12, 7, 5, 2, 3, 5, 3, 2, 11, 6, 2, 5, 7, 7, 4, 3, 4, 2, 3, 7, 11, 5, 4, 3, 3, 3, 9, 2, 7, 1, 10, 8, 12, 9, 4, 4, 7, 2, 5, 5, 5, 2, 4, 7, 4, 6, 1, 1, 3, 4, 7, 5, 9, 5, 5, 1, 0, 3, 2, 4, 4, 4, 7, 5, 5, 4, 4, 8, 2, 3, 5, 3, 1, 8, 4, 2, 4, 3, 3, 12, 2, 4, 4, 3, 5, 7, 3, 2, 5, 0, 2, 5, 3, 4, 4, 12, 1, 4, 1, 3, 4, 3, 12, 2, 5, 3, 4, 5, 5, 7, 4, 5, 3, 5],
                [6, 9, 6, 8, 3, 9, 11, 11, 8, 7, 3, 7, 5, 6, 6, 11, 5, 8, 3, 8, 9, 2, 11, 1, 8, 10, 8, 4, 2, 11, 10, 6, 7, 10, 11, 7, 10, 7, 0, 7, 3, 11, 4, 9, 8, 5, 10, 7, 10, 10, 11, 7, 7, 0, 8, 6, 11, 1, 8, 6, 3, 7, 6, 0, 4, 4, 4, 11, 10, 6, 7, 2, 5, 11, 8, 6, 9, 9, 8, 4, 11, 7, 8, 9, 5, 9, 11, 5, 9, 10, 0, 4, 4, 5, 11, 3, 7, 6, 9, 3, 8, 9, 11, 3, 10, 6, 10, 6, 2, 10, 9, 6, 9, 9, 9, 10, 1, 8, 2, 6, 7, 7, 5, 3, 10, 2, 8, 5, 4, 10],
                [8, 7, 10, 6, 11, 2, 10, 12, 10, 9, 1, 9, 8, 11, 11, 11, 5, 6, 1, 5, 7, 11, 4, 8, 10, 9, 6, 12, 9, 8, 11, 9, 6, 9, 12, 6, 3, 11, 7, 7, 0, 10, 3, 11, 8, 7, 1, 11, 4, 6, 6, 3, 10, 9, 10, 11, 9, 3, 7, 9, 12, 9, 8, 11, 4, 5, 4, 2, 11, 8, 9, 3, 7, 11, 4, 4, 6, 7, 12, 6, 8, 10, 2, 11, 9, 6, 10, 5, 5, 0, 4, 7, 9, 4, 11, 8, 10, 10, 10, 7, 3, 8, 5, 9, 7, 3, 4, 8, 3, 6, 5, 3, 2, 10, 8, 8, 7, 7, 8, 6, 5, 5, 6, 9, 10, 7, 2, 10, 2, 7, 6, 6, 8]
            ]
        }];

        this.paidFeatureReels = [
            {
                id:"b3",
                weight: 1,
                reels:[
                    [7, 6, 5, 13, 11, 6, 10, 13, 8, 9, 7, 13, 11, 11, 4, 13, 7, 9, 1, 7, 11, 8, 13, 7, 3, 3, 11, 13, 10, 6, 6, 7, 13, 9, 11, 10, 3, 13, 8, 6, 11, 13, 3, 7, 8, 4, 13, 11, 10, 6, 13, 9, 8, 10, 13, 4, 8, 4, 11, 9, 8, 13, 9, 9, 5, 11, 13, 4, 4, 8, 9, 0, 10, 10, 13, 11, 5, 9, 8, 9, 13, 7, 3, 2, 13, 8, 11, 9, 3, 2, 13, 6, 2, 9, 11, 13, 2, 10, 5, 7, 6, 6, 4, 11, 10, 4, 6, 5, 13, 10, 11, 8, 5, 13, 3, 10, 8, 6, 13, 7, 10, 1, 4, 7, 13, 10, 3, 9, 5, 2, 6, 9, 6, 3, 7, 5, 5, 10, 7, 13, 8, 7, 8, 2, 9, 13, 10, 6, 1, 8, 7, 6],
                    [3, 1, 4, 6, 13, 5, 3, 4, 0, 3, 10, 6, 2, 3, 5, 2, 2, 11, 0, 6, 3, 4, 3, 4, 6, 5, 8, 13, 10, 6, 2, 11, 5, 4, 8, 2, 0, 6, 6, 7, 5, 7, 4, 4, 6, 1, 5, 4, 5, 1, 3, 5, 3, 2, 2, 6, 6, 4, 11, 1, 3, 9, 5, 5, 5, 4, 5, 2, 5, 9, 3, 3, 6, 4, 13, 2, 4, 5, 2, 6, 4, 2, 1, 6, 6, 4, 5, 1, 1, 3, 6, 7, 1, 2, 4, 5, 6, 6, 3, 10, 4, 4, 3, 3, 4, 5, 3, 4, 2, 5, 2, 1, 4, 2, 5, 2, 2, 5, 8, 3, 5, 4, 5, 4, 3, 3, 4, 2, 3, 4, 3, 5, 6, 4, 4, 3, 3, 3, 4, 5, 5, 3, 5, 5, 9, 3, 3],
                    [6, 9, 13, 6, 8, 3, 13, 9, 11, 11, 13, 8, 7, 3, 7, 13, 5, 6, 6, 11, 13, 5, 8, 3, 8, 13, 9, 2, 0, 11, 1, 8, 10, 13, 8, 4, 2, 11, 10, 13, 6, 7, 10, 11, 13, 7, 10, 7, 0, 7, 3, 11, 13, 4, 9, 13, 8, 5, 10, 13, 7, 10, 10, 11, 13, 7, 7, 0, 8, 13, 6, 11, 1, 8, 6, 13, 3, 7, 6, 0, 4, 4, 4, 13, 11, 10, 6, 13, 7, 2, 5, 13, 11, 8, 6, 13, 9, 9, 8, 4, 11, 13, 7, 8, 9, 13, 5, 9, 11, 13, 5, 9, 10, 0, 4, 4, 13, 5, 11, 3, 7, 13, 6, 9, 3, 8, 9, 13, 11, 3, 10, 6, 10, 6, 2, 10, 9, 6, 9, 9, 9, 10, 1, 8, 2, 6, 7, 7, 5, 3, 10, 2, 8, 5, 4, 10],
                    [4, 10, 3, 7, 5, 2, 1, 2, 7, 6, 2, 11, 5, 4, 7, 3, 10, 3, 3, 7, 5, 4, 3, 5, 5, 7, 7, 1, 4, 3, 2, 5, 3, 7, 7, 5, 2, 3, 5, 3, 2, 11, 6, 2, 5, 7, 7, 4, 3, 4, 2, 3, 7, 11, 5, 4, 3, 3, 3, 9, 2, 7, 1, 10, 8, 9, 4, 4, 7, 2, 13, 5, 5, 5, 2, 4, 7, 4, 6, 1, 1, 3, 4, 7, 5, 9, 5, 5, 1, 0, 3, 2, 4, 4, 4, 7, 5, 5, 4, 4, 8, 2, 3, 5, 3, 1, 8, 4, 2, 13, 4, 3, 3, 2, 4, 4, 3, 5, 7, 3, 2, 5, 0, 2, 5, 3, 4, 4, 1, 4, 1, 3, 4, 3, 13, 2, 5, 3, 4, 5, 5, 7, 4, 5, 3, 5],
                    [8, 7, 10, 13, 6, 11, 2, 10, 13, 10, 9, 1, 9, 13, 8, 11, 11, 11, 5, 6, 13, 1, 5, 7, 0, 11, 4, 13, 8, 10, 9, 6, 13, 9, 8, 11, 13, 9, 6, 9, 13, 6, 3, 11, 13, 7, 7, 10, 3, 11, 13, 8, 7, 1, 11, 13, 4, 6, 6, 13, 3, 10, 9, 13, 10, 11, 9, 13, 3, 7, 9, 13, 9, 8, 11, 4, 13, 5, 4, 2, 11, 8, 13, 9, 3, 7, 11, 4, 4, 6, 7, 13, 6, 8, 10, 2, 11, 9, 13, 6, 10, 5, 5, 4, 7, 9, 4, 11, 8, 13, 10, 10, 10, 7, 3, 8, 5, 9, 7, 3, 4, 8, 3, 6, 5, 3, 2, 10, 8, 8, 7, 7, 8, 6, 5, 5, 6, 9, 10, 7, 2, 10, 2, 7, 6, 6, 8]
                ]
            }, {
                id:"b4",
                weight: 1,
                reels:[
                    [3, 1, 4, 6, 13, 5, 3, 4, 0, 3, 10, 6, 2, 3, 5, 2, 2, 11, 0, 6, 3, 4, 3, 4, 6, 5, 8, 13, 10, 6, 2, 11, 5, 4, 8, 2, 0, 6, 6, 7, 5, 7, 4, 4, 6, 1, 5, 4, 5, 1, 3, 5, 3, 2, 2, 6, 6, 4, 11, 1, 3, 9, 5, 5, 5, 4, 5, 2, 5, 9, 3, 3, 6, 4, 13, 2, 4, 5, 2, 6, 4, 2, 1, 6, 6, 4, 5, 1, 1, 3, 6, 7, 1, 2, 4, 5, 6, 6, 3, 10, 4, 4, 3, 3, 4, 5, 3, 4, 2, 5, 2, 1, 4, 2, 5, 2, 2, 5, 8, 3, 5, 4, 5, 4, 3, 3, 4, 2, 3, 4, 3, 5, 6, 4, 4, 3, 3, 3, 4, 5, 5, 3, 5, 5, 9, 3, 3],
                    [7, 6, 5, 13, 11, 6, 10, 13, 8, 9, 7, 13, 11, 11, 4, 13, 7, 9, 1, 7, 11, 8, 13, 7, 3, 3, 11, 13, 10, 6, 6, 7, 13, 9, 11, 10, 3, 13, 8, 6, 11, 13, 3, 7, 8, 4, 13, 11, 10, 6, 13, 9, 8, 10, 13, 4, 8, 4, 11, 9, 8, 13, 9, 9, 5, 11, 13, 4, 4, 8, 9, 0, 10, 10, 13, 11, 5, 9, 8, 9, 13, 7, 3, 2, 13, 8, 11, 9, 3, 2, 13, 6, 2, 9, 11, 13, 2, 10, 5, 7, 6, 13, 6, 4, 11, 10, 13, 4, 6, 5, 13, 10, 11, 8, 5, 13, 3, 10, 8, 6, 13, 7, 10, 1, 4, 7, 13, 10, 3, 9, 5, 2, 6, 9, 6, 3, 7, 5, 5, 10, 7, 8, 7, 8, 2, 9, 10, 6, 1, 8, 7, 6],
                    [4, 10, 3, 7, 5, 2, 1, 2, 7, 6, 2, 11, 5, 4, 7, 3, 10, 3, 3, 7, 5, 4, 3, 5, 5, 7, 7, 1, 4, 3, 2, 5, 3, 7, 7, 5, 2, 3, 5, 3, 2, 11, 6, 2, 5, 7, 7, 4, 3, 4, 2, 3, 7, 11, 5, 4, 3, 3, 3, 9, 2, 7, 1, 10, 8, 9, 4, 4, 7, 2, 13, 5, 5, 5, 2, 4, 7, 4, 6, 1, 1, 3, 4, 7, 5, 9, 5, 5, 1, 0, 3, 2, 4, 4, 4, 7, 5, 5, 4, 4, 8, 2, 3, 5, 3, 1, 8, 4, 2, 13, 4, 3, 3, 2, 4, 4, 3, 5, 7, 3, 2, 5, 0, 2, 5, 3, 4, 4, 1, 4, 1, 3, 4, 3, 13, 2, 5, 3, 4, 5, 5, 7, 4, 5, 3, 5],
                    [6, 9, 13, 6, 8, 3, 13, 9, 11, 11, 13, 8, 7, 3, 7, 13, 5, 6, 6, 11, 13, 5, 8, 3, 8, 13, 9, 2, 0, 11, 1, 8, 10, 13, 8, 4, 2, 11, 10, 13, 6, 7, 10, 11, 13, 7, 10, 7, 0, 7, 3, 11, 13, 4, 9, 13, 8, 5, 10, 13, 7, 10, 10, 11, 13, 7, 7, 0, 8, 13, 6, 11, 1, 8, 6, 13, 3, 7, 6, 0, 4, 4, 4, 13, 11, 10, 6, 13, 7, 2, 5, 13, 11, 8, 6, 13, 9, 9, 8, 4, 11, 13, 7, 8, 9, 13, 5, 9, 11, 13, 5, 9, 10, 0, 4, 4, 13, 5, 11, 3, 7, 13, 6, 9, 3, 8, 9, 13, 11, 3, 10, 6, 10, 6, 2, 10, 9, 6, 9, 9, 9, 10, 1, 8, 2, 6, 5, 7, 7, 3, 10, 2, 8, 5, 4, 10],
                    [8, 7, 10, 13, 6, 11, 2, 10, 13, 10, 9, 1, 9, 13, 8, 11, 11, 11, 5, 6, 13, 1, 5, 7, 0, 11, 4, 13, 8, 10, 9, 6, 13, 9, 8, 11, 13, 9, 6, 9, 13, 6, 3, 11, 13, 7, 7, 10, 3, 11, 13, 8, 7, 1, 11, 13, 4, 6, 6, 13, 3, 10, 9, 13, 10, 11, 9, 13, 3, 7, 9, 13, 9, 8, 11, 4, 13, 5, 4, 2, 11, 8, 13, 9, 3, 7, 11, 4, 4, 6, 7, 13, 6, 8, 10, 2, 11, 9, 13, 6, 10, 5, 5, 4, 7, 9, 4, 11, 8, 13, 10, 10, 10, 7, 3, 8, 5, 9, 7, 3, 4, 8, 3, 6, 5, 3, 2, 10, 8, 8, 7, 7, 8, 6, 5, 5, 6, 9, 10, 7, 2, 10, 2, 7, 6, 6, 8]
                ]
            }
        ]

        this.freeReels = [
            {
                id:"f1", weight: 1,
                reels:[
                    [7, 6, 5, 13, 11, 6, 10, 13, 8, 9, 7, 13, 11, 11, 4, 13, 7, 9, 1, 7, 11, 8, 13, 7, 3, 3, 11, 13, 10, 0, 6, 6, 7, 13, 9, 11, 0, 10, 3, 13, 8, 6, 11, 13, 3, 7, 0, 8, 4, 13, 11, 10, 6, 13, 9, 8, 10, 13, 4, 8, 4, 0, 11, 9, 8, 13, 9, 9, 5, 11, 13, 4, 4, 8, 9, 0, 10, 10, 13, 11, 5, 9, 8, 9, 13, 7, 3, 2, 13, 8, 11, 9, 3, 2, 13, 6, 2, 9, 11, 13, 2, 10, 5, 7, 6, 13, 6, 4, 11, 10, 13, 4, 6, 5, 13, 10, 11, 8, 5, 13, 3, 10, 8, 6, 13, 7, 10, 1, 4, 7, 13, 10, 3, 9, 13, 5, 2, 6, 9, 13, 6, 3, 7, 13, 5, 5, 10, 7, 8, 7, 8, 2, 9, 10, 6, 1, 8, 7, 6],
                    [3, 1, 4, 6, 13, 5, 3, 4, 0, 3, 10, 6, 2, 3, 5, 2, 2, 11, 0, 6, 3, 4, 3, 4, 0, 6, 5, 8, 13, 10, 6, 2, 0, 11, 5, 4, 8, 2, 0, 6, 6, 7, 5, 0, 7, 4, 4, 6, 1, 5, 4, 0, 5, 1, 3, 5, 3, 2, 2, 0, 6, 6, 4, 11, 1, 3, 9, 5, 5, 5, 4, 0, 5, 2, 5, 9, 0, 3, 3, 6, 4, 13, 2, 4, 5, 2, 0, 6, 4, 2, 1, 6, 6, 4, 0, 5, 1, 1, 3, 6, 0, 7, 1, 2, 4, 5, 6, 6, 3, 10, 0, 4, 4, 3, 3, 4, 5, 3, 4, 2, 5, 2, 1, 4, 2, 5, 2, 2, 5, 8, 3, 5, 4, 5, 4, 3, 3, 4, 2, 3, 4, 3, 5, 6, 4, 4, 3, 3, 3, 4, 5, 5, 3, 5, 5, 9, 3, 3],
                    [6, 9, 13, 6, 8, 3, 13, 9, 11, 11, 13, 8, 7, 3, 7, 13, 5, 6, 6, 11, 13, 5, 8, 3, 8, 13, 9, 2, 0, 11, 1, 8, 10, 13, 8, 4, 2, 11, 10, 13, 6, 7, 10, 11, 13, 7, 10, 7, 0, 7, 3, 11, 13, 4, 9, 13, 8, 5, 10, 13, 7, 10, 10, 11, 13, 7, 7, 0, 8, 13, 6, 11, 1, 8, 6, 13, 3, 7, 6, 0, 4, 4, 4, 13, 11, 10, 6, 13, 7, 2, 5, 13, 11, 8, 6, 13, 9, 9, 8, 4, 11, 13, 7, 8, 9, 13, 5, 9, 11, 13, 5, 9, 10, 0, 4, 4, 13, 5, 11, 3, 7, 13, 6, 9, 3, 8, 9, 13, 11, 3, 10, 6, 13, 10, 6, 2, 10, 13, 9, 6, 9, 9, 9, 10, 1, 8, 2, 6, 7, 7, 5, 3, 10, 2, 8, 5, 4, 10],
                    [4, 10, 3, 7, 5, 2, 1, 2, 7, 6, 2, 11, 5, 4, 7, 3, 10, 3, 3, 7, 5, 4, 3, 5, 5, 7, 7, 1, 4, 3, 2, 5, 3, 7, 7, 5, 2, 3, 5, 3, 2, 11, 6, 2, 5, 7, 7, 4, 3, 4, 2, 3, 7, 11, 5, 4, 3, 3, 3, 9, 2, 7, 1, 10, 8, 9, 4, 4, 7, 2, 13, 5, 5, 5, 2, 4, 7, 4, 6, 1, 1, 3, 4, 7, 5, 9, 5, 5, 1, 0, 3, 2, 4, 4, 4, 7, 5, 5, 4, 4, 8, 2, 3, 5, 3, 1, 8, 4, 2, 13, 4, 3, 3, 2, 4, 4, 3, 5, 7, 3, 2, 5, 0, 2, 5, 3, 4, 4, 1, 4, 1, 3, 4, 3, 13, 2, 5, 3, 4, 5, 5, 7, 4, 5, 3, 5],
                    [8, 7, 10, 13, 6, 11, 2, 10, 13, 10, 9, 1, 9, 13, 8, 11, 11, 11, 5, 6, 13, 1, 5, 7, 0, 11, 4, 13, 8, 10, 9, 6, 13, 9, 8, 11, 13, 9, 6, 9, 13, 6, 3, 11, 13, 7, 7, 10, 3, 11, 13, 8, 7, 1, 11, 13, 4, 6, 6, 13, 3, 10, 9, 13, 10, 11, 9, 13, 3, 7, 9, 13, 9, 8, 11, 4, 13, 5, 4, 2, 11, 8, 13, 9, 3, 7, 11, 4, 4, 6, 7, 13, 6, 8, 10, 2, 11, 9, 13, 6, 10, 5, 5, 4, 7, 9, 4, 11, 8, 13, 10, 10, 10, 7, 3, 8, 5, 9, 13, 7, 3, 4, 8, 3, 6, 13, 5, 3, 2, 10, 8, 8, 7, 7, 8, 6, 5, 5, 6, 9, 10, 7, 2, 10, 2, 7, 6, 6, 8]
                ]
            }, 
            {
                id:"f2", weight: 1,
                reels:[
                    [3, 1, 4, 6, 13, 5, 3, 4, 0, 3, 10, 6, 2, 3, 5, 2, 2, 11, 0, 6, 3, 4, 3, 4, 0, 6, 5, 8, 13, 10, 6, 2, 0, 11, 5, 4, 8, 2, 0, 6, 6, 7, 5, 0, 7, 4, 4, 6, 1, 5, 4, 0, 5, 1, 3, 5, 3, 2, 2, 0, 6, 6, 4, 11, 1, 3, 9, 5, 5, 5, 4, 0, 5, 2, 5, 9, 0, 3, 3, 6, 4, 13, 2, 4, 5, 2, 0, 6, 4, 2, 1, 6, 6, 4, 0, 5, 1, 1, 3, 6, 0, 7, 1, 2, 4, 5, 6, 6, 3, 10, 0, 4, 4, 3, 3, 4, 5, 3, 4, 2, 5, 2, 1, 4, 2, 5, 2, 2, 5, 8, 3, 5, 4, 5, 4, 3, 3, 4, 2, 3, 4, 3, 5, 6, 4, 4, 3, 3, 3, 4, 5, 5, 3, 5, 5, 9, 3, 3],
                    [6, 9, 13, 6, 8, 3, 13, 9, 11, 11, 13, 8, 7, 3, 7, 13, 5, 6, 6, 11, 13, 5, 8, 3, 8, 13, 9, 2, 0, 11, 1, 8, 10, 13, 8, 4, 2, 11, 10, 13, 6, 7, 10, 11, 13, 7, 10, 7, 0, 7, 3, 11, 13, 4, 9, 13, 8, 5, 10, 13, 7, 10, 10, 11, 13, 7, 7, 0, 8, 13, 6, 11, 1, 8, 6, 13, 3, 7, 6, 0, 4, 4, 4, 13, 11, 10, 6, 13, 7, 2, 5, 13, 11, 8, 6, 13, 9, 9, 8, 4, 11, 13, 7, 8, 9, 13, 5, 9, 11, 13, 5, 9, 10, 0, 4, 4, 13, 5, 11, 3, 7, 13, 6, 9, 3, 8, 9, 13, 11, 3, 10, 6, 13, 10, 6, 2, 10, 13, 9, 6, 9, 9, 9, 13, 10, 1, 8, 2, 6, 7, 7, 13, 5, 3, 10, 2, 13, 8, 5, 4, 10],
                    [4, 10, 3, 7, 5, 2, 1, 2, 7, 6, 2, 11, 5, 4, 7, 3, 10, 3, 3, 7, 5, 4, 3, 5, 5, 7, 7, 1, 4, 3, 2, 5, 3, 7, 7, 5, 2, 3, 5, 3, 2, 11, 6, 2, 5, 7, 7, 4, 3, 4, 2, 3, 7, 11, 5, 4, 3, 3, 3, 9, 2, 7, 1, 10, 8, 9, 4, 4, 7, 2, 13, 5, 5, 5, 2, 4, 7, 4, 6, 1, 1, 3, 4, 7, 5, 9, 5, 5, 1, 0, 3, 2, 4, 4, 4, 7, 5, 5, 4, 4, 8, 2, 3, 5, 3, 1, 8, 4, 2, 13, 4, 3, 3, 2, 4, 4, 3, 5, 7, 3, 2, 5, 0, 2, 5, 3, 4, 4, 1, 4, 1, 3, 4, 3, 13, 2, 5, 3, 4, 5, 5, 7, 4, 5, 3, 5],
                    [7, 6, 5, 13, 11, 6, 10, 13, 8, 9, 7, 13, 11, 11, 4, 13, 7, 9, 1, 7, 11, 8, 13, 7, 3, 3, 11, 13, 10, 0, 6, 6, 7, 13, 9, 11, 0, 10, 3, 13, 8, 6, 11, 13, 3, 7, 0, 8, 4, 13, 11, 10, 6, 13, 9, 8, 10, 13, 4, 8, 4, 0, 11, 9, 8, 13, 9, 9, 5, 11, 13, 4, 4, 8, 9, 0, 10, 10, 13, 11, 5, 9, 8, 9, 13, 7, 3, 2, 13, 8, 11, 9, 3, 2, 13, 6, 2, 9, 11, 13, 2, 10, 5, 7, 6, 13, 6, 4, 11, 10, 13, 4, 6, 5, 13, 10, 11, 8, 5, 13, 3, 10, 8, 6, 13, 7, 10, 1, 4, 7, 13, 10, 3, 9, 13, 5, 2, 6, 9, 6, 3, 7, 5, 5, 10, 7, 8, 7, 8, 2, 9, 10, 6, 1, 8, 7, 6],
                    [8, 7, 10, 13, 6, 11, 2, 10, 13, 10, 9, 1, 9, 13, 8, 11, 11, 11, 5, 6, 13, 1, 5, 7, 0, 11, 4, 13, 8, 10, 9, 6, 13, 9, 8, 11, 13, 9, 6, 9, 13, 6, 3, 11, 13, 7, 7, 10, 3, 11, 13, 8, 7, 1, 11, 13, 4, 6, 6, 13, 3, 10, 9, 13, 10, 11, 9, 13, 3, 7, 9, 13, 9, 8, 11, 4, 13, 5, 4, 2, 11, 8, 13, 9, 3, 7, 11, 4, 4, 6, 7, 13, 6, 8, 10, 2, 11, 9, 13, 6, 10, 5, 5, 4, 7, 9, 4, 11, 8, 13, 10, 10, 10, 7, 3, 8, 5, 9, 13, 7, 3, 4, 8, 3, 6, 5, 3, 2, 10, 8, 8, 7, 7, 8, 6, 5, 5, 6, 9, 10, 7, 2, 10, 2, 7, 6, 6, 8]
                ]
            }
        ]

        this.reSpinReels = [
            {
                id:"bf1", weight: 68,
                reels: [
                    [7, 13, 6, 5, 13, 11, 6, 10, 13, 8, 9, 7, 13, 11, 11, 4, 13, 7, 9, 13, 1, 7, 11, 8, 13, 7, 3, 3, 11, 13, 10, 0, 6, 6, 7, 13, 9, 11, 0, 10, 3, 13, 8, 6, 11, 13, 3, 7, 0, 8, 4, 13, 11, 10, 6, 13, 9, 8, 10, 13, 4, 8, 4, 0, 11, 9, 8, 13, 9, 9, 5, 11, 13, 4, 4, 8, 9, 0, 10, 10, 13, 11, 5, 9, 8, 9, 13, 7, 3, 2, 8, 11, 9, 3, 2, 13, 6, 2, 9, 11, 13, 2, 10, 5, 7, 6, 13, 6, 4, 13, 11, 10, 13, 4, 6, 5, 13, 10, 11, 8, 5, 13, 3, 10, 8, 6, 13, 7, 10, 1, 4, 7, 13, 10, 3, 9, 13, 5, 2, 6, 9, 13, 6, 3, 7, 13, 5, 5, 10, 7, 8, 7, 8, 2, 9, 10, 6, 1, 8],
                    [3, 1, 4, 6, 13, 5, 3, 4, 0, 3, 10, 6, 2, 3, 5, 2, 2, 11, 0, 6, 3, 4, 3, 4, 0, 6, 5, 8, 13, 10, 6, 2, 0, 11, 5, 4, 8, 2, 0, 6, 6, 7, 5, 0, 7, 4, 4, 6, 1, 5, 4, 0, 5, 1, 3, 5, 3, 2, 2, 0, 6, 6, 4, 11, 1, 3, 9, 5, 5, 5, 4, 0, 5, 2, 5, 9, 0, 3, 3, 6, 4, 13, 2, 4, 5, 2, 0, 6, 4, 2, 1, 6, 6, 4, 0, 5, 1, 1, 3, 6, 0, 7, 1, 2, 4, 5, 6, 6, 3, 10, 0, 4, 4, 3, 3, 4, 5, 3, 4, 2, 5, 2, 1, 4, 2, 5, 2, 2, 5, 8, 3, 5, 4, 5, 4, 3, 3, 4, 2, 3, 4, 3, 5, 6, 4, 4, 3, 3, 3, 4, 5, 5, 3, 5, 5, 9, 3, 3],
                    [6, 9, 13, 6, 8, 3, 13, 9, 11, 11, 13, 8, 7, 3, 7, 13, 5, 6, 6, 11, 13, 5, 8, 3, 8, 13, 9, 2, 0, 11, 1, 8, 10, 13, 8, 4, 2, 11, 10, 13, 6, 7, 10, 11, 13, 7, 10, 13, 7, 0, 7, 3, 11, 13, 4, 9, 13, 8, 5, 10, 13, 7, 10, 10, 11, 13, 7, 7, 0, 8, 13, 6, 11, 1, 8, 6, 13, 3, 7, 6, 0, 4, 4, 4, 13, 11, 10, 6, 13, 7, 2, 5, 11, 8, 6, 13, 9, 9, 13, 8, 4, 11, 13, 7, 8, 9, 13, 5, 9, 11, 13, 5, 9, 10, 0, 4, 4, 13, 5, 11, 13, 3, 7, 13, 6, 9, 3, 13, 8, 9, 13, 11, 3, 10, 6, 13, 10, 6, 2, 10, 13, 9, 6, 9, 9, 9, 10, 1, 8, 2, 6, 7, 7, 5, 3, 10, 2, 8, 5],
                    [4, 10, 3, 7, 5, 2, 1, 2, 7, 6, 2, 11, 5, 4, 7, 3, 10, 3, 3, 7, 5, 4, 3, 5, 5, 7, 7, 1, 4, 3, 2, 5, 3, 7, 7, 5, 2, 3, 5, 3, 2, 11, 6, 2, 5, 7, 7, 4, 3, 4, 2, 3, 7, 11, 5, 4, 3, 3, 3, 9, 2, 7, 1, 10, 8, 9, 4, 4, 7, 2, 13, 5, 5, 5, 2, 4, 7, 4, 6, 1, 1, 3, 4, 7, 5, 9, 5, 5, 1, 0, 3, 2, 4, 4, 4, 7, 5, 5, 4, 4, 8, 2, 3, 5, 3, 1, 8, 4, 2, 13, 4, 3, 3, 2, 4, 4, 3, 5, 7, 3, 2, 5, 0, 2, 5, 3, 4, 4, 1, 4, 1, 3, 4, 3, 13, 2, 5, 3, 4, 5, 5, 7, 4, 5, 3, 5],
                    [8, 7, 10, 13, 6, 11, 2, 10, 13, 10, 9, 1, 9, 13, 8, 11, 11, 11, 5, 6, 13, 1, 5, 7, 0, 11, 4, 13, 8, 10, 9, 6, 13, 9, 8, 11, 13, 9, 6, 9, 13, 6, 3, 11, 13, 7, 7, 10, 3, 11, 13, 8, 7, 1, 11, 13, 4, 6, 6, 13, 3, 10, 9, 13, 10, 11, 9, 13, 3, 7, 9, 13, 9, 8, 11, 4, 13, 5, 4, 2, 11, 8, 13, 9, 3, 7, 11, 4, 4, 6, 7, 13, 6, 8, 10, 2, 11, 9, 13, 6, 10, 5, 5, 4, 7, 9, 4, 11, 8, 13, 10, 10, 10, 7, 3, 8, 5, 9, 13, 7, 3, 4, 8, 3, 6, 13, 5, 3, 2, 10, 8, 8, 7, 7, 13, 8, 6, 5, 5, 6, 9, 10, 7, 2, 10, 2, 7, 6, 6, 8]
                ]
            },{
                id:"bf2", weight: 32,
                reels: [
                    [3, 1, 4, 6, 13, 5, 3, 4, 0, 3, 10, 6, 2, 3, 5, 2, 2, 11, 0, 6, 3, 4, 3, 4, 0, 6, 5, 8, 13, 10, 6, 2, 0, 11, 5, 4, 8, 2, 0, 6, 6, 7, 5, 0, 7, 4, 4, 6, 1, 5, 4, 0, 5, 1, 3, 5, 3, 2, 2, 0, 6, 6, 4, 11, 1, 3, 9, 5, 5, 5, 4, 0, 5, 2, 5, 9, 0, 3, 3, 6, 4, 13, 2, 4, 5, 2, 0, 6, 4, 2, 1, 6, 6, 4, 0, 5, 1, 1, 3, 6, 0, 7, 1, 2, 4, 5, 6, 6, 3, 10, 0, 4, 4, 3, 3, 4, 5, 3, 4, 2, 5, 2, 1, 4, 2, 5, 2, 2, 5, 8, 3, 5, 4, 5, 4, 3, 3, 4, 2, 3, 4, 3, 5, 6, 4, 4, 3, 3, 3, 4, 5, 5, 3, 5, 5, 9, 3, 3],
                    [6, 9, 13, 6, 8, 3, 9, 11, 11, 13, 8, 7, 3, 7, 13, 5, 6, 6, 11, 13, 5, 8, 13, 3, 8, 13, 9, 2, 0, 11, 1, 8, 10, 13, 8, 4, 2, 11, 10, 13, 6, 7, 13, 10, 11, 13, 7, 10, 7, 0, 7, 3, 11, 13, 4, 9, 13, 8, 5, 10, 13, 7, 10, 10, 11, 13, 7, 7, 0, 8, 13, 6, 11, 1, 8, 6, 13, 3, 7, 6, 0, 4, 4, 4, 13, 11, 10, 6, 13, 7, 2, 5, 13, 11, 8, 6, 13, 9, 9, 13, 8, 4, 11, 13, 7, 8, 9, 13, 5, 9, 11, 13, 5, 9, 10, 0, 4, 4, 13, 5, 11, 3, 7, 13, 6, 9, 3, 8, 9, 13, 11, 3, 10, 6, 13, 10, 6, 2, 10, 13, 9, 6, 9, 9, 9, 13, 10, 1, 8, 2, 6, 7, 7, 13, 5, 3, 10, 2, 13, 8, 5, 4, 10],
                    [4, 10, 3, 7, 5, 2, 1, 2, 7, 6, 2, 11, 5, 4, 7, 3, 10, 3, 3, 7, 5, 4, 3, 5, 5, 7, 7, 1, 4, 3, 2, 5, 3, 7, 7, 5, 2, 3, 5, 3, 2, 11, 6, 2, 5, 7, 7, 4, 3, 4, 2, 3, 7, 11, 5, 4, 3, 3, 3, 9, 2, 7, 1, 10, 8, 9, 4, 4, 7, 2, 13, 5, 5, 5, 2, 4, 7, 4, 6, 1, 1, 3, 4, 7, 5, 9, 5, 5, 1, 0, 3, 2, 4, 4, 4, 7, 5, 5, 4, 4, 8, 2, 3, 5, 3, 1, 8, 4, 2, 13, 4, 3, 3, 2, 4, 4, 3, 5, 7, 3, 2, 5, 0, 2, 5, 3, 4, 4, 1, 4, 1, 3, 4, 3, 13, 2, 5, 3, 4, 5, 5, 7, 4, 5, 3, 5],
                    [7, 6, 5, 13, 11, 6, 10, 13, 8, 9, 7, 13, 11, 11, 4, 13, 7, 9, 1, 7, 11, 8, 13, 7, 3, 3, 11, 13, 10, 0, 6, 6, 7, 13, 9, 11, 0, 10, 3, 13, 8, 6, 11, 13, 3, 7, 0, 8, 4, 13, 11, 13, 10, 6, 13, 9, 8, 10, 13, 4, 8, 4, 0, 11, 13, 9, 8, 13, 9, 9, 5, 11, 13, 4, 4, 8, 9, 0, 10, 10, 13, 11, 5, 9, 8, 9, 13, 7, 3, 2, 13, 8, 11, 9, 3, 2, 13, 6, 2, 9, 11, 13, 2, 10, 5, 7, 6, 13, 6, 4, 11, 10, 13, 4, 6, 5, 13, 10, 11, 8, 5, 13, 3, 10, 8, 6, 13, 7, 10, 1, 4, 7, 13, 10, 3, 9, 13, 5, 2, 6, 9, 6, 3, 7, 5, 5, 10, 7, 8, 7, 8, 2, 9, 10, 6, 1, 8, 7, 6],
                    [8, 7, 10, 13, 6, 11, 2, 10, 13, 10, 9, 1, 9, 13, 8, 11, 11, 11, 5, 6, 13, 1, 5, 7, 0, 11, 4, 13, 8, 10, 9, 6, 13, 9, 8, 11, 13, 9, 6, 9, 13, 6, 3, 11, 13, 7, 7, 13, 10, 3, 11, 13, 8, 7, 1, 11, 13, 4, 6, 6, 13, 3, 10, 9, 13, 10, 11, 9, 13, 3, 7, 9, 13, 9, 8, 11, 4, 13, 5, 4, 13, 2, 11, 8, 13, 9, 3, 7, 11, 4, 4, 6, 7, 13, 6, 8, 10, 2, 11, 9, 13, 6, 10, 5, 5, 4, 7, 9, 4, 11, 8, 13, 10, 10, 10, 7, 3, 8, 5, 9, 13, 7, 3, 4, 8, 3, 6, 5, 3, 2, 10, 8, 8, 7, 7, 8, 6, 5, 5, 6, 9, 10, 7, 2, 10, 2, 7, 6, 6, 8]
                ]
            }
        ]


        this.actions["BaseGameLevels"] = {
            id:'base-level',
            feature:[
                { weight:82, symbols:[11], id:"1" },
                { weight:150, symbols:[10, 11], id:"2" },
                { weight:150, symbols:[9, 10, 11], id:"3" },
                { weight:150, symbols:[8, 9, 10, 11], id:"4" },
                { weight:200, symbols:[7, 8, 9, 10, 11], id:"5" },
                { weight:150, symbols:[6, 7, 8, 9, 10, 11], id:"6" },
                { weight:100, symbols:[5, 6, 7, 8, 9, 10, 11], id:"7" },
                { weight:10, symbols:[4, 5, 6, 7, 8, 9, 10, 11], id:"8" },
                { weight:6, symbols:[3, 4, 5, 6, 7, 8, 9, 10, 11], id:"9" },
                { weight:2, symbols:[2, 3, 4, 5, 6, 7, 8, 9, 10, 11], id:"10" }
            ]
        }
        this.actions["BaseLevelsMystery"] = {
            id:'base-mystery',
            features:[
                [
                    { id:"1", weight:12, symbols:[10] } ,				
                    { id:"1", weight:12, symbols:[9] } ,				
                    { id:"1", weight:11, symbols:[8] } ,				
                    { id:"1", weight:10, symbols:[7] } ,				
                    { id:"1", weight:9, symbols:[6] } ,				
                    { id:"1", weight:9, symbols:[5] } ,				
                    { id:"1", weight:9, symbols:[4] } ,				
                    { id:"1", weight:8, symbols:[3] } ,				
                    { id:"1", weight:7, symbols:[2] } ,				
                    { id:"1", weight:5, symbols:[1] } ,				
                    { id:"1", weight:8, symbols:[14] } 
                ], 
                [
                    { id:"2", weight:12, symbols:[9] } ,				
                    { id:"2", weight:11, symbols:[8] } ,				
                    { id:"2", weight:10, symbols:[7] } ,				
                    { id:"2", weight:9, symbols:[6] } ,				
                    { id:"2", weight:9, symbols:[5] } ,				
                    { id:"2", weight:9, symbols:[4] } ,				
                    { id:"2", weight:8, symbols:[3] } ,				
                    { id:"2", weight:7, symbols:[2] } ,				
                    { id:"2", weight:5, symbols:[1] } ,				
                    { id:"2", weight:8, symbols:[14] } 
                ], 
                [
                    { id:"3", weight:11, symbols:[8] } ,				
                    { id:"3", weight:10, symbols:[7] } ,				
                    { id:"3", weight:9, symbols:[6] } ,				
                    { id:"3", weight:9, symbols:[5] } ,				
                    { id:"3", weight:9, symbols:[4] } ,				
                    { id:"3", weight:8, symbols:[3] } ,				
                    { id:"3", weight:7, symbols:[2] } ,				
                    { id:"3", weight:5, symbols:[1] } ,				
                    { id:"3", weight:8, symbols:[14] }                 
                ], 
                [
                    { id:"4", weight:10, symbols:[7] } ,				
                    { id:"4", weight:9, symbols:[6] } ,				
                    { id:"4", weight:9, symbols:[5] } ,				
                    { id:"4", weight:9, symbols:[4] } ,				
                    { id:"4", weight:8, symbols:[3] } ,				
                    { id:"4", weight:7, symbols:[2] } ,				
                    { id:"4", weight:5, symbols:[1] } ,				
                    { id:"4", weight:8, symbols:[14] } ,                    
                ], 
                [
                    { id:"5", weight:9, symbols:[6] } ,				
                    { id:"5", weight:9, symbols:[5] } ,				
                    { id:"5", weight:9, symbols:[4] } ,				
                    { id:"5", weight:8, symbols:[3] } ,				
                    { id:"5", weight:7, symbols:[2] } ,				
                    { id:"5", weight:5, symbols:[1] } ,				
                    { id:"5", weight:8, symbols:[14] } 
                ], 
                [
                    { id:"6", weight:9, symbols:[5] } ,				
                    { id:"6", weight:9, symbols:[4] } ,				
                    { id:"6", weight:8, symbols:[3] } ,				
                    { id:"6", weight:7, symbols:[2] } ,				
                    { id:"6", weight:5, symbols:[1] } ,				
                    { id:"6", weight:8, symbols:[14] } 
                ], 
                [
                    { id:"7", weight:9, symbols:[4] } ,				
                    { id:"7", weight:8, symbols:[3] } ,				
                    { id:"7", weight:7, symbols:[2] } ,				
                    { id:"7", weight:5, symbols:[1] } ,				
                    { id:"7", weight:8, symbols:[14] } 
                ], 
                [
                    { id:"8", weight:8, symbols:[3] } ,				
                    { id:"8", weight:7, symbols:[2] } ,				
                    { id:"8", weight:5, symbols:[1] } ,				
                    { id:"8", weight:8, symbols:[14] } 
                ], 
                [
                    { id:"9", weight:7, symbols:[2] } ,				
                    { id:"9", weight:5, symbols:[1] } ,				
                    { id:"9", weight:8, symbols:[14] }
                ], 
                [
                    { id:"10", weight:5, symbols:[1] } ,				
                    { id:"10", weight:8, symbols:[14] } 
                ]
            ]
        };
        this.actions["BaseMysteryOnly"] = {
            feature:[
                { id:"", weight:12, symbols:[11] },
                { id:"", weight:12, symbols:[10] },
                { id:"", weight:10, symbols:[9] },
                { id:"", weight:10, symbols:[8] },
                { id:"", weight:10, symbols:[7] },
                { id:"", weight:11, symbols:[6] },
                { id:"", weight:10, symbols:[5] },
                { id:"", weight:10, symbols:[4] },
                { id:"", weight:8, symbols:[3] },
                { id:"", weight:5, symbols:[2] },
                { id:"", weight:2, symbols:[1] }
            ]
        }
        this.actions["FreespinTrigger"] = { triggers:["freespin"], id:"freespin", spins:12 };
        this.actions["FreespinReTrigger"] = { triggers:["retrigger"], id:"retrigger", spins:3 };
        this.actions["FreeLevelsMystery"] = {
            id:'free-mystery',
            feature:[
                { id:"0", weight:0, symbols:[] },
                { id:"1", weight:0, symbols:[11] },
                { id:"2", weight:0, symbols:[10, 11] },
                { id:"3", weight:0, symbols:[9, 10, 11] },
                { id:"4", weight:0, symbols:[8, 9, 10, 11] },
                { id:"5", weight:0, symbols:[7, 8, 9, 10, 11] },
                { id:"6", weight:0, symbols:[6, 7, 8, 9, 10, 11] },
                { id:"7", weight:0, symbols:[5, 6, 7, 8, 9, 10, 11] },
                { id:"8", weight:0, symbols:[4, 5, 6, 7, 8, 9, 10, 11] },
                { id:"9", weight:0, symbols:[3, 4, 5, 6, 7, 8, 9, 10, 11] },
                { id:"10", weight:0, symbols:[2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
            ],
            features:[
                [
                    { id:"0", weight:12, symbols:[11] } ,	
                    { id:"0", weight:12, symbols:[10] } ,				
                    { id:"0", weight:12, symbols:[9] } ,				
                    { id:"0", weight:11, symbols:[8] } ,				
                    { id:"0", weight:10, symbols:[7] } ,				
                    { id:"0", weight:9, symbols:[6] } ,				
                    { id:"0", weight:9, symbols:[5] } ,				
                    { id:"0", weight:9, symbols:[4] } ,				
                    { id:"0", weight:8, symbols:[3] } ,				
                    { id:"0", weight:7, symbols:[2] } ,				
                    { id:"0", weight:5, symbols:[1] } ,				
                    { id:"0", weight:8, symbols:[14] } 
                ], [
                    { id:"1", weight:12, symbols:[10] } ,				
                    { id:"1", weight:12, symbols:[9] } ,				
                    { id:"1", weight:11, symbols:[8] } ,				
                    { id:"1", weight:10, symbols:[7] } ,				
                    { id:"1", weight:9, symbols:[6] } ,				
                    { id:"1", weight:9, symbols:[5] } ,				
                    { id:"1", weight:9, symbols:[4] } ,				
                    { id:"1", weight:8, symbols:[3] } ,				
                    { id:"1", weight:7, symbols:[2] } ,				
                    { id:"1", weight:5, symbols:[1] } ,				
                    { id:"1", weight:8, symbols:[14] } 
                ], [
                    { id:"2", weight:12, symbols:[9] } ,				
                    { id:"2", weight:11, symbols:[8] } ,				
                    { id:"2", weight:10, symbols:[7] } ,				
                    { id:"2", weight:9, symbols:[6] } ,				
                    { id:"2", weight:9, symbols:[5] } ,				
                    { id:"2", weight:9, symbols:[4] } ,				
                    { id:"2", weight:8, symbols:[3] } ,				
                    { id:"2", weight:7, symbols:[2] } ,				
                    { id:"2", weight:5, symbols:[1] } ,				
                    { id:"2", weight:8, symbols:[14] } 
                ], [
                    { id:"3", weight:11, symbols:[8] } ,				
                    { id:"3", weight:10, symbols:[7] } ,				
                    { id:"3", weight:9, symbols:[6] } ,				
                    { id:"3", weight:9, symbols:[5] } ,				
                    { id:"3", weight:9, symbols:[4] } ,				
                    { id:"3", weight:8, symbols:[3] } ,				
                    { id:"3", weight:7, symbols:[2] } ,				
                    { id:"3", weight:5, symbols:[1] } ,				
                    { id:"3", weight:4, symbols:[14] }                 
                ], [
                    { id:"4", weight:10, symbols:[7] } ,				
                    { id:"4", weight:9, symbols:[6] } ,				
                    { id:"4", weight:9, symbols:[5] } ,				
                    { id:"4", weight:9, symbols:[4] } ,				
                    { id:"4", weight:8, symbols:[3] } ,				
                    { id:"4", weight:7, symbols:[2] } ,				
                    { id:"4", weight:5, symbols:[1] } ,				
                    { id:"4", weight:4, symbols:[14] } ,                    
                ], [
                    { id:"5", weight:9, symbols:[6] } ,				
                    { id:"5", weight:9, symbols:[5] } ,				
                    { id:"5", weight:9, symbols:[4] } ,				
                    { id:"5", weight:8, symbols:[3] } ,				
                    { id:"5", weight:7, symbols:[2] } ,				
                    { id:"5", weight:5, symbols:[1] } ,				
                    { id:"5", weight:4, symbols:[14] } 
                ], [
                    { id:"6", weight:9, symbols:[5] } ,				
                    { id:"6", weight:9, symbols:[4] } ,				
                    { id:"6", weight:8, symbols:[3] } ,				
                    { id:"6", weight:7, symbols:[2] } ,				
                    { id:"6", weight:5, symbols:[1] } ,				
                    { id:"6", weight:4, symbols:[14] } 
                ], [
                    { id:"7", weight:9, symbols:[4] } ,				
                    { id:"7", weight:8, symbols:[3] } ,				
                    { id:"7", weight:7, symbols:[2] } ,				
                    { id:"7", weight:5, symbols:[1] } ,				
                    { id:"7", weight:4, symbols:[14] } 
                ], [
                    { id:"8", weight:8, symbols:[3] } ,				
                    { id:"8", weight:7, symbols:[2] } ,				
                    { id:"8", weight:5, symbols:[1] } ,				
                    { id:"8", weight:4, symbols:[14] } 
                ], [
                    { id:"9", weight:7, symbols:[2] } ,				
                    { id:"9", weight:5, symbols:[1] } ,				
                    { id:"9", weight:4, symbols:[14] }
                ], [
                    { id:"10", weight:5, symbols:[1] } ,				
                    { id:"10", weight:4, symbols:[14] } 
                ]
            ]
        }

        this.conditions["UseMysteryReels"] = { 
            id:"mystery", symbol:this.mystrySymbolId, isAvailable:[ 
            { available:true, weight:41 }, { available:false, weight:959} ] 
        }; 
        this.conditions["FreespinTrigger"] = { id:"freespin", symbol:12, oak:[3] };
        this.conditions["MysteryTrigger"] = { id:"mystery", symbol:this.mystrySymbolId, minCount:1 };        


        this.collection ["FreeSpinLevelcondition"] = [
            { from:0, to:10, level:"0" },
            { from:10, to:25, level:"1" },
            { from:25, to:45, level:"2" },
            { from:45, to:70, level:"3" },
            { from:70, to:100, level:"4" },
            { from:100, to:135, level:"5" },
            { from:135, to:175, level:"6" },
            { from:175, to:220, level:"7" },
            { from:220, to:270, level:"8" },
            { from:270, to:325, level:"9" },
            { from:325, to:-1, level:"10" } 
        ]
        this.collection ["BuyBonusAward"] = [{ weight:80, count:3} ]


        this.goldMultiplier = [
            {
                weight:97, id:"set1", 
                multipliers:[
                    { multiplier:1, weight:2500 },
                    { multiplier:2, weight:800 },
                    { multiplier:3, weight:400 },
                    { multiplier:4, weight:150 },
                    { multiplier:5, weight:50 } 
                ]
            }, {
                weight:3, id:"set2", 
                multipliers:[
                    { multiplier:10, weight:1000 },
                    { multiplier:15, weight:500 },
                    { multiplier:20, weight:200 },
                    { multiplier:25, weight:100 },
                    { multiplier:30, weight:50 },
                    { multiplier:40, weight:40 },
                    { multiplier:50, weight:20 },
                    { multiplier:100, weight:10 },
                    { multiplier:200, weight:5 },
                    { multiplier:500, weight:3 },
                    { multiplier:1000, weight:2 },
                    { multiplier:2500, weight:1 }
                ]
            }
        ]
    }

}

class GoldSets {
    public weight:number ;
    public id:string ;
    public multipliers:GoldMultipliers[] = []; 
}

class GoldMultipliers {
    public weight:number ;
    public multiplier:number ;
}
