import dotenv from "dotenv";
dotenv.config();

import express from "express";
var app = express();

import router from "./router";
var bodyParser = require('body-parser');

import connectDB from "./db";
import logger from "./logger";

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Dehri - A Simple API Gateway");
});

app.use(router);

const PORT = process.env.PORT || 3000;

connectDB()
.then(() => {
  app.listen(PORT, () => {
    logger.info("Dehri server started : " + new Date());
  });
})
.catch((err) => {
	logger.error("db connection failed !!! ", err);
});