import { FeatureDetails, SlotFeaturesState, SlotSpinState, SlotState } from "../../engine/slots/models/slot_state_model";
import { PlatformMath } from "../base/platform_math";
import { ResponseModel } from "../base/response_model";
import { GameStatus } from "../../engine/generic/models/game_state_model";
import BigNumber from "bignumber.js";

export class PlayResponseV2Model extends ResponseModel {

    public bets :GameV2BetResponse;
    public results :GameV2ResultsResponse;
    public state :GameV2StateResponse;

    constructor( version:string, name:string, math:PlatformMath, state:SlotState ){
        super( version, name, "");
        this.parseGameBets( state.gameStatus, math );

        let spins :SlotSpinState[] = [];
        switch( state.gameStatus.action ) {
            case "spin" : spins = state.paidSpin; break;
            case "freespin" : spins = state.freespins[ state.freespins.length-1]; break;
            default : break;
        }
        this.parseGameState( state.gameStatus, spins, state.freespin );
        this.parseGameResult( spins, math.defaultgrid );
    }

    parseGameResult(spin: SlotSpinState[], grid:number[][]) {
        this.results = new GameV2ResultsResponse();

        this.results.reels = [];
        this.results.win = {};
        this.results.win.symbolWin = {};
        this.results.win.symbolWin.coins = 0;
        this.results.win.symbolWin.symbols = [];
        this.results.win.scatterWin = {};
        this.results.win.scatterWin.coins = 0;
        this.results.win.scatterWin.scatters = [];
        
        if ( spin && spin.length > 0 ) {   
            this.renderSpinGrid( spin[0].finalGrid, spin[0].initialGrid );

            this.results.win.total = spin[0].win;            
            this.results.win.symbolWin.coins = spin[0].win; 

            spin[0].wins.forEach( win => {
                const sym = { dir:"LEFT", smbID:win.symbol, lineID:win.id, amt:win.pay, num:win.offsets.length, mult:win.multiplier };
                sym["pos"] = win.offsets.map( offset => [ offset%5, Math.ceil( offset/5) ] )
                this.results.win.symbolWin.symbols.push( sym )
            })

            spin[0].features.forEach( feature => {
                if ( feature.isActive && feature.id == "freespin") {
                    this.results.win.scatterWin.scatters.push( {
                        "smbID": feature.symbol, "amt": 0, "num": feature.offsets.length ,
                        "bonusWon": "FREESPINS", "bonusWonValue": feature.count
                    })
                    
                }
            })

        } else {
            this.renderSpinGrid( grid);
        }

    }

    renderSpinGrid(grid: number[][], prevGrid: number[][] = null) {
        this.results.reels = [];
        for( let i :number=0; i<grid.length; i++ ){
            this.results.reels[i] = [];
            for( let j :number=0; j<grid[i].length; j++ ){
                this.results.reels[i][j] = { "smbID": grid[i][j] }
                if ( prevGrid && prevGrid[i][j] != grid[i][j] )
                    this.results.reels[i][j]["prevSmbID"] = prevGrid[i][j] 
            }
        }
    }
    
    parseGameBets(state: GameStatus, math: PlatformMath) {
        this.bets = new GameV2BetResponse();
        this.bets.lines = math.info.payLines.length;
        this.bets.stake = new BigNumber(state.totalBet).toNumber();
        this.bets.stakePerLine = new BigNumber(state.stakeValue).toNumber();
    }

    parseGameState(status: GameStatus, spin: SlotSpinState[], feature: FeatureDetails) {
        this.state = new GameV2StateResponse();
        this.state.status = this.getGameStatus( status );
        this.state.totalWin = status.totalWin.toNumber();

        if (feature) {
            this.state.totalFSAwarded = feature.total;
            this.state.freespinsRemaining = feature.left;
            this.state.wonAdditionalSpins = feature.retrigger;
        }
        
        if ( spin && spin.length > 0 ) {    ;
            this.state.reelSet = spin[0].reelId;
            this.state.mult = spin[0].multiplier;
            this.state.feature = [];
            spin[0].features.forEach( feature => {
                if (feature.isActive)
                    this.state.feature.push( this.getFeaturesResponse( feature) ) 
            } )
        }
    }

    getGameStatus( status: GameStatus): string {
        if ( status.action == "spin" && status.nextAction[0] == "freespin" ){
            return "FREESPINS_TRIGGER";
        }
        if ( status.action == "freespin" && status.nextAction[0] == "freespin" ){
            return "FREESPINS";
        }
        return "NORMAL";
    }

    getFeaturesResponse (feature: SlotFeaturesState) {
        switch( feature.id ) {
            case "mystery":
                return this.getMysterySymbolResponse( feature);
        }
        
    }

    getMysterySymbolResponse( feature) {
        return {  
            featureName:"TRANSFORM_TO_SYMBOL",
            level:feature.level,
            transformTo:feature.symbol
        }
    }

}

class GameV2ResultsResponse {
    public win;
    public reels :any[];
}

class GameV2StateResponse {
    public reelSet :string;
    public status :string;
    public preMult :number = 1;
    public totalFSAwarded :number = 0;
    public freespinsRemaining :number = 0;
    public wonAdditionalSpins :number = 0;
    public totalWin :number = 0;
    public mult :number = 1;
    public feature = null;
    public hasCapped : boolean = false
}


export class ConfigResponseV2Model extends PlayResponseV2Model {

    public config :GameV2ConfigResponse;

    constructor( version:string, name:string, math:PlatformMath, state:SlotState ){
        super( version, name, math, state);
        this.parseGameConfigs( math );
    }

    parseGameConfigs(math: PlatformMath) {
        this.config = new GameV2ConfigResponse();
        this.config.autoPlayValues = math.autoPlayValues;
        this.config.maxCoins = math.maxCoins;
        this.config.type = math.gameConfig.type;
        this.config.betValues = math.bets;
        this.config.defaultBetVal = math.defaultBet;
        this.config.freespins = math.gameConfig.freespins;
        this.config.numRows = math.info.gridLayout[0];
        this.config.numReels = math.info.gridLayout.length;
        this.config.payDirection = math.gameConfig.payDirection;
        this.config.coinsPlayed = math.info.betMultiplier.toNumber();
        this.config.disableBuyIn = math.gameConfig.disableBuyIn;

        this.config.lines = [];
        math.info.payLines.forEach( pl => this.config.lines.push( pl.join("") ) ) 
        
        this.config.paytable = [];
        math.info.symbols.forEach( symbol => {
            const map = {}
            symbol.payout.forEach( (pay, index) => {
                if ( pay.isGreaterThan ( new BigNumber (0) ))
                    map[index.toString()] = pay.toNumber()
            });
            const pay = { id:symbol.id, payout:map, name:symbol.name };
            pay[symbol.key] = true;
            this.config.paytable.push( pay );
        } );

    }
}

class GameV2BetResponse {
    public stake :number = null;
    public stakePerLine :number = null;
    public balance = null;
    public addBalance :number = 0;
    public lines :number;
    public settle :boolean = false;
    public buyIn :boolean = false;
}

class GameV2ConfigResponse {
    public RTP :number = 0;
    public maxCoins :number ;
    public type :string;
    public defaultBetVal :number;
    public freespins :boolean;
    public numRows :number;
    public numReels :number;
    public payDirection :string;
    public coinsPlayed :number;
    public disableBuyIn :boolean;

    public paytable :any[];
    public lines :string[];
    public payScreenThresholds :number[];
    public autoPlayValues :number[];
    public betValues :number[];

    public buyInSetup = null;

}
