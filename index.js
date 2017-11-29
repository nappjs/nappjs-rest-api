const CoreDataRest = require("js-core-data-rest");
const bodyParser = require("body-parser");

const REST_API_PATH = process.env.REST_API_PATH || "/";

module.exports = app => {
  app.use(REST_API_PATH, bodyParser.json());
  app.use(REST_API_PATH, CoreDataRest.rest(app.locals.database));
};
