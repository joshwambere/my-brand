let chai = require("chai");
let server = require("../index.js");
let chaiHttp = require("chai-http");
const { response } = require("express");
const should = chai.use(chaiHttp).should();

describe("Email api", () => {
  describe("send mail /api/email", () => {
    it("send mail", () => {
      const mail = {
        name: "joshn",
        email: "josh@gmail.com",
        message: "message heree",
        subject: "just saying hi",
      };

      chai
        .request(server)
        .post("/api/mail")
        .send(mail)
        .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
        });
    });
  });
});
