const assert = require("assert");
const supertest = require("supertest");
const express = require("express");

const app = require("js-core-data-app")();
const restApi = require("../");
const api = express();
api.use(restApi(app.database));

const test = supertest(api);

describe("api", () => {
  beforeEach(() => {
    return require("./seed-data")(app.database);
  });
  after(() => {
    return app.database.closeAllConnections();
  });

  it("should fetch entities", () => {
    return test
      .get("/people")
      .expect(206)
      .expect(res => {
        assert.equal(res.body.length, 1);

        let person = res.body[0];
        assert.equal(person.firstname, "John");
        assert.equal(person.lastname, "Doe");
      });
  });
  it("should fetch entity detail", () => {
    return test
      .get("/people/1")
      .expect(200)
      .expect(res => {
        let person = res.body;
        assert.equal(person.firstname, "John");
        assert.equal(person.lastname, "Doe");
      });
  });
});
