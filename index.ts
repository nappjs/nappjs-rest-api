import { NappJS, NappJSModule } from 'nappjs';

const assert = require("assert");

const CoreDataRest = require("js-core-data-rest");
const bodyParser = require("body-parser");

const REST_API_PATH = process.env.REST_API_PATH || "/";

export default class NappJSRestAPI extends NappJSModule {
  async postRegister(napp: NappJS) {
    assert.ok(napp.locals.database, "database not found in locals");
    assert.ok(napp.locals.api, "api not found in locals");

    napp.locals.api.use(REST_API_PATH, bodyParser.json());
    napp.locals.api.use(REST_API_PATH, CoreDataRest.rest(napp.locals.database));
  }
}