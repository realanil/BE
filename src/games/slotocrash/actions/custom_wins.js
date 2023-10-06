"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWins = void 0;
var slot_state_model_1 = require("../../../libs/engine/slots/models/slot_state_model");
var grid_1 = require("../../../libs/engine/slots/utils/grid");
var CustomWins = /** @class */ (function () {
    function CustomWins() {
    }
    CustomWins.EvaluateNewReelWin = function (grid, stake, math) {
        var lastSymbol = grid[grid.length - 1][0];
        if (lastSymbol === math.blastSymbol) {
            return [];
        }
        var wins = [];
        math.info.symbols.forEach(function (symbol) {
            if (symbol.payout && symbol.payout.length > 0) {
                if (symbol.id === lastSymbol) {
                    var win = new slot_state_model_1.SlotSpinWinsState();
                    win.symbol = symbol.id;
                    win.offsets = [grid.length - 1];
                    win.pay = stake.multipliedBy(symbol.payout[1]);
                    wins.push(win);
                }
            }
        });
        return wins;
    };
    CustomWins.EvaluateWin = function (grid, stake, math) {
        var wins = [];
        var blasts = grid_1.Grid.FindScatterOffsets(math.blastSymbol, grid);
        if (blasts.length > 0) {
            return wins;
        }
        math.info.symbols.forEach(function (symbol) {
            if (symbol.payout && symbol.payout.length > 0) {
                var offsets = grid_1.Grid.FindScatterOffsets(symbol.id, grid);
                if (offsets.length > 0) {
                    var win = new slot_state_model_1.SlotSpinWinsState();
                    win.symbol = symbol.id;
                    win.offsets = offsets;
                    win.pay = stake.multipliedBy(symbol.payout[1]).multipliedBy(offsets.length);
                    wins.push(win);
                }
            }
        });
        return wins;
    };
    return CustomWins;
}());
exports.CustomWins = CustomWins;
