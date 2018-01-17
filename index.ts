import { NappJS, NappJSService } from 'nappjs';
import NappJSApi from 'nappjs-api';
import NappJSCoreData from 'nappjs-core-data';

const assert = require("assert");

const CoreDataRest = require("js-core-data-rest");
const bodyParser = require("body-parser");

const REST_API_PATH = process.env.REST_API_PATH || "/";

export default class NappJSRestAPI extends NappJSService {
  static dependencies = ["nappjs-core-data", "nappjs-api"];

  coredata: NappJSCoreData;
  api: NappJSApi;

  constructor(coredata: NappJSCoreData, api: NappJSApi) {
    super();
    this.coredata = coredata;
    this.api = api;
  }

  async load(napp: NappJS) {
    assert.ok(this.coredata.database, "database not found in locals");
    assert.ok(this.api, "api not found in locals");

    this.api.app.use(REST_API_PATH, bodyParser.json());
    this.api.app.use(REST_API_PATH, CoreDataRest.rest(this.coredata.database));
  }
}
