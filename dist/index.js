"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
const router_1 = __importDefault(require("./router"));
var bodyParser = require('body-parser');
const db_1 = __importDefault(require("./db"));
const logger_1 = __importDefault(require("./logger"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send("Dehri - A Simple API Gateway");
});
app.use(router_1.default);
const PORT = process.env.PORT || 3000;
(0, db_1.default)()
    .then(() => {
    app.listen(PORT, () => {
        logger_1.default.info("Dehri server started : " + new Date());
    });
})
    .catch((err) => {
    logger_1.default.error("db connection failed !!! ", err);
});
//# sourceMappingURL=index.js.map