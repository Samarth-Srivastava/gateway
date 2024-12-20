"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function adapter(baseURL) {
    return axios_1.default.create({
        baseURL: baseURL,
    });
}
exports.default = adapter;
//# sourceMappingURL=apiAdapter.js.map