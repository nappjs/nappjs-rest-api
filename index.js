const Router = require("express").Router;
const CoreDataRest = require("js-core-data-rest");
const bodyParser = require("body-parser");

const REST_API_PATH = process.env.REST_API_URL || "/";

module.exports = database => {
  let app = new Router();

  app.use(REST_API_PATH, bodyParser.json());
  app.use(REST_API_PATH, CoreDataRest.rest(database));

  return app;
};
