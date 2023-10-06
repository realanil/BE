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
exports.SlotCrashResponseModel = void 0;
var bignumber_js_1 = require("bignumber.js");
var play_response_model_1 = require("../../../libs/platform/slots/play_response_model");
var SlotCrashResponseModel = /** @class */ (function (_super) {
    __extends(SlotCrashResponseModel, _super);
    function SlotCrashResponseModel(version, name, error, state) {
        var _this = _super.call(this, version, name, error, state) || this;
        var s = state;
        _this.collectedWin = s.collectedWin || new bignumber_js_1.default(0);
        _this.isCollected = s.isCollected || false;
        return _this;
    }
    return SlotCrashResponseModel;
}(play_response_model_1.PlayResponseModel));
exports.SlotCrashResponseModel = SlotCrashResponseModel;
