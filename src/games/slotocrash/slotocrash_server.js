"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotocrashServer = void 0;
var bignumber_js_1 = require("bignumber.js");
var base_slot_game_1 = require("../../libs/platform/slots/base_slot_game");
var slotocrash_state_1 = require("./models/slotocrash_state");
var slot_state_model_1 = require("../../libs/engine/slots/models/slot_state_model");
var create_grid_1 = require("../../libs/engine/slots/actions/create_grid");
var cloner_1 = require("../../libs/engine/slots/utils/cloner");
var custom_grid_1 = require("./actions/custom_grid");
var custom_wins_1 = require("./actions/custom_wins");
var calculate_wins_1 = require("../../libs/engine/slots/actions/calculate_wins");
var slotocrash_math_1 = require("./models/slotocrash_math");
var spin_condition_1 = require("../../libs/engine/slots/conditions/spin_condition");
var triggerer_1 = require("../../libs/engine/slots/features/triggerer");
var update_feature_1 = require("../../libs/engine/slots/features/update_feature");
var slotcrash_response_1 = require("./models/slotcrash_response");
var SlotocrashServer = /** @class */ (function (_super) {
    __extends(SlotocrashServer, _super);
    function SlotocrashServer() {
        var _this = _super.call(this, "Slotocrash", "0.3") || this;
        _this.state = new slotocrash_state_1.SlotocrashState();
        _this.math = new slotocrash_math_1.SlotocrashMath();
        return _this;
    }
    SlotocrashServer.prototype.executeBaseSpin = function () {
        var state = new slot_state_model_1.SlotSpinState();
        state.initialGrid = create_grid_1.CreateGrid.WeightedSymbolGrid(this.rng, this.math.paidReels[0].symbols, this.math.info.gridLayout);
        custom_grid_1.CustomGrid.AddBlastSymbol(this.rng, state, this.math);
        state.finalGrid = cloner_1.Cloner.CloneGrid(state.initialGrid);
        state.wins = custom_wins_1.CustomWins.EvaluateWin(state.finalGrid, this.state.gameStatus.stakeValue, this.math);
        state.win = calculate_wins_1.CalculateWins.AddPays(state.wins);
        state.win = state.win.multipliedBy(state.multiplier);
        var feature = spin_condition_1.SpinCondition.WinCondition(this.math.conditions[0], state);
        if (feature.isActive) {
            state.win = state.win.plus(this.state.gameStatus.totalBet);
            triggerer_1.Triggerer.UpdateFeature(this.state, feature, this.math.actions[0]);
            triggerer_1.Triggerer.UpdateNextAction(this.state, this.math.actions[0]);
            this.state.freespin.accumulated = state.win;
        }
        this.state.paidSpin.push(state);
        this.state.gameStatus.currentWin = new bignumber_js_1.default(0);
        this.state.gameStatus.totalWin = new bignumber_js_1.default(0);
    };
    SlotocrashServer.prototype.executeCollect = function () {
        var state = this.state.paidSpin[0];
        state.wins = [];
        state.win = new bignumber_js_1.default(0);
        this.state.gameStatus.currentWin = this.state.freespin.accumulated;
        this.state.gameStatus.totalWin = this.state.freespin.accumulated;
        this.state.gameStatus.nextAction = ["freespin"];
        this.state.isCollected = true;
        this.state.collectedWin = this.state.freespin.accumulated;
    };
    SlotocrashServer.prototype.executeFreeSpin = function () {
        var state = this.state.paidSpin[0];
        var previn = this.state.freespin.accumulated;
        var stake = this.state.gameStatus.stakeValue;
        state.multiplier += 1;
        custom_grid_1.CustomGrid.AddNewReel(this.rng, state, this.math, Number(previn));
        state.finalGrid = cloner_1.Cloner.CloneGrid(state.initialGrid);
        state.wins = custom_wins_1.CustomWins.EvaluateNewReelWin(state.finalGrid, new bignumber_js_1.default(stake), this.math);
        if (state.wins.length > 1) {
            throw new Error("Wins " + state.wins.length);
        }
        state.win = calculate_wins_1.CalculateWins.AddPays(state.wins);
        state.win = state.win.multipliedBy(state.multiplier);
        this.state.freespin.accumulated = new bignumber_js_1.default(previn).plus(state.win);
        var feature = spin_condition_1.SpinCondition.WinCondition(this.math.conditions[0], state);
        if (feature.isActive) {
            triggerer_1.Triggerer.UpdateFeature(this.state, feature, this.math.actions[1]);
            triggerer_1.Triggerer.UpdateNextAction(this.state, this.math.actions[1]);
        }
        update_feature_1.UpdateFeature.updateFreeSpinCount(this.state);
        if (this.state.isCollected === true) {
            this.state.gameStatus.nextAction = ["freespin"];
        }
        if (this.state.freespin.left === 0) {
            // this.state.freespin.accumulated = new BigNumber(0);
            this.state.gameStatus.nextAction = ["spin"];
        }
        this.state.gameStatus.currentWin = new bignumber_js_1.default(0);
        this.state.gameStatus.totalWin = new bignumber_js_1.default(0);
    };
    SlotocrashServer.prototype.getPlayResponse = function () {
        return new slotcrash_response_1.SlotCrashResponseModel(this.version, this.name, this.state.error, this.state);
    };
    return SlotocrashServer;
}(base_slot_game_1.BaseSlotGame));
exports.SlotocrashServer = SlotocrashServer;
