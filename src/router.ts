import express from "express";
var router = express.Router();
import apiAdapter from "./apiAdapter";
import apiModel from "./dbModel";
import apiModelData from "./dbInterface";

router.use((req, res, next) => {
  console.log("Called: ", req.path);

  var getTenant = req.headers.tenant ?? null;

  if (getTenant) {
    var route: apiModelData;

    apiModel
      .find({ TENANT: getTenant })
      .then((allroutesForTenant) => {
        route = allroutesForTenant.filter(
          (a) => a.DOWNSTREAM_ENDPOINT == req.path
        )[0];
      })
      .then((abc) => {
        if (route && route.METHOD == "get") {
          var port = route.UPSTREAM_PORT ? ":" + route.UPSTREAM_PORT : "";

          var BASE_URL =
            route.UPSTREAM_PROTOCOL + "://" + route.UPSTREAM_DOMAIN + port;

          const api = apiAdapter(BASE_URL);
          var url = route.UPSTREAM_ENDPOINT;

          api
            .get(url)
            .then((resp: { data: any }) => {
              res.send(resp.data);
            })
            .catch((ex: any) => {
              console.log(ex);
            });
        } else if (route && route.METHOD == "post") {
          var port = route.UPSTREAM_PORT ? ":" + route.UPSTREAM_PORT : "";

          var BASE_URL =
            route.UPSTREAM_PROTOCOL + "://" + route.UPSTREAM_DOMAIN + port;

          const api = apiAdapter(BASE_URL);
          var url = route.UPSTREAM_ENDPOINT;
          console.log(req);

          api
            .post(url, req.body)
            .then((resp: { data: any }) => {
              res.send(resp.data);
            })
            .catch((ex: any) => {
              console.log(ex);
            });
        } else {
          res.send("Wrong Endpoints passed");
        }
      });
  } else {
    res.send("Tenant not registered");
  }
});

export default router;
