"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const apiAdapter_1 = __importDefault(require("./apiAdapter"));
const dbModel_1 = __importDefault(require("./dbModel"));
router.use((req, res, next) => {
    var _a;
    console.log("Called: ", req.path);
    var getTenant = (_a = req.headers.tenant) !== null && _a !== void 0 ? _a : null;
    if (getTenant) {
        var route;
        dbModel_1.default
            .find({ TENANT: getTenant })
            .then((allroutesForTenant) => {
            route = allroutesForTenant.filter((a) => a.DOWNSTREAM_ENDPOINT == req.path)[0];
        })
            .then((abc) => {
            if (route && route.METHOD == "get") {
                var port = route.UPSTREAM_PORT ? ":" + route.UPSTREAM_PORT : "";
                var BASE_URL = route.UPSTREAM_PROTOCOL + "://" + route.UPSTREAM_DOMAIN + port;
                const api = (0, apiAdapter_1.default)(BASE_URL);
                var url = route.UPSTREAM_ENDPOINT;
                api
                    .get(url)
                    .then((resp) => {
                    res.send(resp.data);
                })
                    .catch((ex) => {
                    console.log(ex);
                });
            }
            else if (route && route.METHOD == "post") {
                var port = route.UPSTREAM_PORT ? ":" + route.UPSTREAM_PORT : "";
                var BASE_URL = route.UPSTREAM_PROTOCOL + "://" + route.UPSTREAM_DOMAIN + port;
                const api = (0, apiAdapter_1.default)(BASE_URL);
                var url = route.UPSTREAM_ENDPOINT;
                console.log(req);
                api
                    .post(url, req.body)
                    .then((resp) => {
                    res.send(resp.data);
                })
                    .catch((ex) => {
                    console.log(ex);
                });
            }
            else {
                res.send("Wrong Endpoints passed");
            }
        });
    }
    else {
        res.send("Tenant not registered");
    }
});
exports.default = router;
//# sourceMappingURL=router.js.map