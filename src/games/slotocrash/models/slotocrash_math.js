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
exports.SlotocrashMath = void 0;
var bignumber_js_1 = require("bignumber.js");
var platform_math_1 = require("../../../libs/platform/base/platform_math");
var SlotocrashMath = /** @class */ (function (_super) {
    __extends(SlotocrashMath, _super);
    function SlotocrashMath() {
        var _this = _super.call(this) || this;
        _this.blastProb = [];
        _this.blastSymbol = 3;
        _this.symbols = [];
        _this.symbolsAfter = [];
        _this.defaultgrid = [[0], [3], [2]];
        _this.info = {
            betMultiplier: new bignumber_js_1.default(1),
            gridLayout: [1, 1, 1],
            wildSymbols: [],
            payLines: [],
            symbols: [
                { name: "Sym1", id: 0, payout: [_this.bd(0), _this.bd(0.1)] },
                { name: "Sym2", id: 1, payout: [_this.bd(0), _this.bd(0.2)] },
                { name: "Sym3", id: 2, payout: [_this.bd(0), _this.bd(0.5)] },
                { name: "BLAST", id: _this.blastSymbol, payout: [] }
            ]
        };
        _this.blastProb = [{ weight: 6761, add: false }, { weight: 3239, add: true }];
        _this.paidReels = [{
                id: "", reels: [],
                symbols: [{ symbol: 0, weight: 75 }, { symbol: 1, weight: 20 }, { symbol: 2, weight: 5 }]
            }];
        _this.symbols = [{ symbol: 0, weight: 6 }, { symbol: 1, weight: 2 }, { symbol: 2, weight: 2 }];
        _this.symbolsAfter = [{ symbol: 0, weight: 4 }, { symbol: 1, weight: 3 }, { symbol: 2, weight: 3 }];
        _this.conditions = [{ "symbol": -1, "id": "freespins" }];
        _this.actions = [
            { "triggers": ["freespin", "collect"], "spins": 1 },
            { "triggers": ["retrigger", "collect"], "spins": 1 }
        ];
        return _this;
    }
    return SlotocrashMath;
}(platform_math_1.PlatformMath));
exports.SlotocrashMath = SlotocrashMath;
var AddBlastProb = /** @class */ (function () {
    function AddBlastProb() {
    }
    return AddBlastProb;
}());
