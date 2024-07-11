process.env.ENCRYPTION_KEY = "testencppkey";

const request = require("supertest");
const app = require("../app");

describe("POST /register", function () {
  it("incomplete body", function (done) {
    request(app)
      .post("/register")
      .send({ name: "john" })
      .set("Accept", "application/json")
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
  it("user already existis", function (done) {
    request(app)
      .post("/register")
      .send({ name: "jerry", email: "jerry@example.com", password: "1234" })
      .set("Accept", "application/json")
      .expect(409)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
  it("user created", function (done) {
    request(app)
      .post("/register")
      .send({ name: "jerry", email: "jerry@example.com456", password: "1234" })
      .set("Accept", "application/json")
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe("POST /login", function () {
    it("incomplete body", function (done) {
      request(app)
        .post("/login")
        .send({ name: "john" })
        .set("Accept", "application/json")
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          return done();
        });
    });
    it("invalid credentials", function (done) {
      request(app)
        .post("/login")
        .send({ name: "jerry", email: "jerry@example.com456", password: "1111" })
        .set("Accept", "application/json")
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          return done();
        });
    });
    it("successful authentication", function (done) {
      request(app)
        .post("/login")
        .send({ name: "jerry", email: "jerry@example.com456", password: "1234" })
        .set("Accept", "application/json")
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });