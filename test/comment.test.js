let chai = require("chai");
let server = require("../index.js");
let chaiHttp = require("chai-http");
const { response } = require("express");
const should = chai.use(chaiHttp).should();

describe("Comment API", () => {
  describe("post /api/comment/", () => {
    it("should post one comment", () => {
      const comment = {
        name: "joshnson",
        email: "josh@gmail.com",
        comment: "here is my comment",
        post_id: "5f46c9c4b5512991dbd36352"
      };
      const tokken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTkxNDY2MjMsImV4cCI6MTU5OTI0MDIyM30.gbBl_nlHJ_znAQOOTl0qV5m2CpPj82Czj9rZsssOFmc";
      chai
        .request(server)
        .post("/api/comments")
        .set({ Authorization: tokken })
        .send(comment)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eq("comment added successfuly");
        });
    });

    /*
     *providing no post id
     */
    it("should not post a comment", () => {
      const comment = {
        name: "joshnson",
        email: "josh@gmail.com",
        comment: "here is my comment"
      };
      const tokken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTkxNDY2MjMsImV4cCI6MTU5OTI0MDIyM30.gbBl_nlHJ_znAQOOTl0qV5m2CpPj82Czj9rZsssOFmc";
      chai
        .request(server)
        .post("/api/comments")
        .set({ Authorization: tokken })
        .send(comment)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eq("comment are related with a post");
        });
    });
    /*
     *providing incorrrect token
     */
    it("should not post a comment", () => {
      const comment = {
        name: "joshnson",
        email: "josh@gmail.com",
        comment: "here is my comment"
      };
      const tokken =
        "eJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg4NjA5MTEsImV4cCI6MTU5ODk1NDUxMX0.a8y4oSxId-TcZYC7OtkrIf2Y4tQa0mZckAjgSGV7rdg";
      chai
        .request(server)
        .post("/api/comments")
        .set({ Authorization: tokken })
        .send(comment)
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("invalid token");
        });
    });
  });

  describe("Get comment", () => {
    it("should get comment based on post id", () => {
      const postId = "5f439be909f3c3c03e855cc5";
      chai
        .request(server)
        .get("/api/comments/onpost")
        .send(postId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
        });
    });
    it("should not get comment", () => {
      const postId = "f439be909f3c3c03e85cc5";
      chai
        .request(server)
        .get("/api/comments/onpost")
        .send(postId)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("message").eq("no comment found");
        });
    });
  });
});
