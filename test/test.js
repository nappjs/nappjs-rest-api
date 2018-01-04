const assert = require("assert");
const supertest = require("supertest");
const path = require("path");

const napp = require("nappjs")();
let test = null;

describe("api", () => {
  before(async () => {
    napp.addPlugin("test", path.join(__dirname, "../index"));
    await napp.load();
    await require("./seed-data")(napp.locals.database);
    test = supertest(napp.locals.api);
  });

  after(() => {
    return napp.locals.database.closeAllConnections();
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
