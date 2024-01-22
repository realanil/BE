"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomGrid = void 0;
var Random_1 = require("../../../libs/engine/generic/rng/Random");
var random_1 = require("../../../libs/engine/slots/utils/random");
var CustomGrid = /** @class */ (function () {
    function CustomGrid() {
    }
    CustomGrid.AddBlastSymbol = function (rng, state, math) {
        var addBlast = random_1.RandomHelper.GetRandomFromList(rng, math.blastProb);
        if (addBlast.add) {
            var pos = rng.getRandom(new Random_1.RandomObj(0, 3, -1));
            state.initialGrid[pos.num][0] = math.blastSymbol;
        }
    };
    CustomGrid.AddNewReel = function (rng, state, math, accumulated) {
        var d = 10000;
        var prob;
        var symbols = [];
        if (state.initialGrid.length < 10) {
            prob = state.multiplier * 0.2 / ((accumulated) + (state.multiplier * 0.2));
            symbols = math.symbols;
        }
        else {
            prob = state.multiplier * 0.25 / (accumulated + (state.multiplier * 0.25));
            symbols = math.symbolsAfter;
        }
        if (prob <= 0) {
            throw new Error("prob " + prob);
        }
        prob *= d;
        var value = rng.getRandom(new Random_1.RandomObj(0, d, -1));
        if (value.num <= prob) {
            state.initialGrid.push([math.blastSymbol]);
        }
        else {
            var symbol = random_1.RandomHelper.GetRandomFromList(rng, symbols);
            state.initialGrid.push([symbol.symbol]);
        }
    };
    return CustomGrid;
}());
exports.CustomGrid = CustomGrid;
