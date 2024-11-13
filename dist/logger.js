"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
let getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hour = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const sec = String(today.getSeconds()).padStart(2, '0');
    //const localDate = `${year}${month}${day}${hour}${min}${sec}`;
    const localDate = `${year}${month}${day}`;
    return localDate;
};
const LOG_PATH = './logs';
__filename = LOG_PATH + "/log_" + getFormattedDate() + ".log";
log4js_1.default.configure({
    appenders: {
        console: { type: "console" },
        file: {
            type: "file",
            filename: __filename,
            maxLogSize: 10485760, // 10MB
            backups: 3,
            compress: true
        }
    },
    categories: {
        default: { appenders: ["console", "file"], level: "all" }
    }
});
const logger = log4js_1.default.getLogger('file');
exports.default = logger;
//# sourceMappingURL=logger.js.map