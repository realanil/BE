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
exports.SlotocrashState = void 0;
var bignumber_js_1 = require("bignumber.js");
var slot_state_model_1 = require("../../../libs/engine/slots/models/slot_state_model");
var SlotocrashState = /** @class */ (function (_super) {
    __extends(SlotocrashState, _super);
    function SlotocrashState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isCollected = false;
        _this.collectedWin = new bignumber_js_1.default(0);
        return _this;
    }
    return SlotocrashState;
}(slot_state_model_1.SlotState));
exports.SlotocrashState = SlotocrashState;
