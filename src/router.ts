import express from "express";
var router = express.Router();
import apiAdapter from "./apiAdapter";
import apiModel from "./dbModel";
import apiModelData from "./dbInterface";
import logger from "./logger";

router.use((req, res, next) => {
  console.log("Called: ", req.path + " on " + req.method);

  var getTenant = req.headers.tenant ?? null;

  if (getTenant) {
    var route: apiModelData;
    var param: string = '';
    var isParamQuery: boolean = false;

    apiModel
      .find({ TENANT: getTenant, METHOD : req.method.toLowerCase() })
      .then((allroutesForTenant) => {
        route = allroutesForTenant.filter(
          (a) => a.DOWNSTREAM_ENDPOINT == req.path
        )[0];

        //query string /users?page=12&size=10
        if(!route && req.path.indexOf('?') > -1){

          let incomingEndPoint = req.path.split('?');

          route = allroutesForTenant.filter(a =>{
            param = "?" + incomingEndPoint[1];
            isParamQuery = true;
            return a.DOWNSTREAM_ENDPOINT == incomingEndPoint[0]
          })[0];
        }
        

        //send parameter as url /user/:userId
        if(!route){
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

          var BASE_URL =
            route.UPSTREAM_PROTOCOL + "://" + route.UPSTREAM_DOMAIN + port;

          const api = apiAdapter(BASE_URL);
          var url = route.UPSTREAM_ENDPOINT;

          if(param){
            if(isParamQuery){
              url = url + param;
            }
            else{
              url = url.split(':')[0];
              url = url + param;
            }
          }

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
      })
      .catch(ex => {
        logger.error(ex.message);
        logger.error(ex);
      });
  } else {
    res.send("Tenant not registered");
  }
});

export default router;
