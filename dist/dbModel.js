"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const apiSchema = new mongoose_1.default.Schema({
    TENANT: {
        type: String,
        require: true
    },
    METHOD: {
        type: String,
        require: true
    },
    UPSTREAM_PROTOCOL: {
        type: String,
        require: true
    },
    UPSTREAM_DOMAIN: {
        type: String,
        require: true
    },
    UPSTREAM_PORT: {
        type: Number,
        require: true
    },
    UPSTREAM_ENDPOINT: {
        type: String,
        require: true
    },
    DOWNSTREAM_ENDPOINT: {
        type: String,
        require: true
    }
});
const apiModel = mongoose_1.default.model('apiData', apiSchema);
exports.default = apiModel;
//# sourceMappingURL=dbModel.js.map