const assert = require("assert");
const supertest = require("supertest");
const path = require("path");

const napp = require("nappjs").NewNappJS();
let test = null;

describe("api", () => {
  before(async () => {
    napp.addPlugin("nappjs-rest-api", path.join(__dirname, "../index"));
    await napp.load();
    let coredata = napp.getService("nappjs-core-data");
    let api = napp.getService("nappjs-api");
    await require("./seed-data")(coredata.database);
    test = supertest(api.app);
  });

  after(() => {
    return napp.stop();
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
