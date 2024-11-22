"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const apiAdapter_1 = __importDefault(require("./apiAdapter"));
const dbModel_1 = __importDefault(require("./dbModel"));
const logger_1 = __importDefault(require("./logger"));
router.use((req, res, next) => {
    var _a;
    console.log("Called: ", req.path + " on " + req.method);
    var getTenant = (_a = req.headers.tenant) !== null && _a !== void 0 ? _a : null;
    if (getTenant) {
        var route;
        var param = '';
        var isParamQuery = false;
        dbModel_1.default
            .find({ TENANT: getTenant, METHOD: req.method.toLowerCase() })
            .then((allroutesForTenant) => {
            route = allroutesForTenant.filter((a) => a.DOWNSTREAM_ENDPOINT == req.path)[0];
            //query string /users?page=12&size=10
            if (!route && req.path.indexOf('?') > -1) {
                let incomingEndPoint = req.path.split('?');
                route = allroutesForTenant.filter(a => {
                    param = "?" + incomingEndPoint[1];
                    isParamQuery = true;
                    return a.DOWNSTREAM_ENDPOINT == incomingEndPoint[0];
                })[0];
            }
            //send parameter as url /user/:userId
            if (!route) {
                route = allroutesForTenant.filter(a => {
                    let savedEndPoint = a.DOWNSTREAM_ENDPOINT.split('/');
                    let incomingEndPoint = req.path.split('/');
                    param = "/" + incomingEndPoint[2];
                    return savedEndPoint.length == incomingEndPoint.length;
                })[0];
            }
        })
            .then((abc) => {
            if (route && route.METHOD == "get") {
                var port = route.UPSTREAM_PORT ? ":" + route.UPSTREAM_PORT : "";
                var BASE_URL = route.UPSTREAM_PROTOCOL + "://" + route.UPSTREAM_DOMAIN + port;
                const api = (0, apiAdapter_1.default)(BASE_URL);
                var url = route.UPSTREAM_ENDPOINT;
                if (param) {
                    if (isParamQuery) {
                        url = url + param;
                    }
                    else {
                        url = url.split(':')[0];
                        url = url + param;
                    }
                }
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
        })
            .catch(ex => {
            logger_1.default.error(ex.message);
            logger_1.default.error(ex);
        });
    }
    else {
        res.send("Tenant not registered");
    }
});
exports.default = router;
//# sourceMappingURL=router.js.map