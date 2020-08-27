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
        post_id: "5f46c9c4b5512991dbd36352",
      };
      const tokken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg1MjE0MTksImV4cCI6MTU5ODYxNTAxOX0.wbMcRNcUuZqUYp-kgFvPE_ZRJWY41gjxBq1knmWUj_A";
      chai
        .request(server)
        .post("/api/comments")
        .set({ Authorization: tokken })
        .send(comment)
        .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('message').eq('comment added successfuly');
        });
    });

    /*
     *providing incorrect tokken
     */
    it("should not post a comment", () => {
        const comment = {
          name: "joshnson",
          email: "josh@gmail.com",
          comment: "here is my comment",
        
        };
        const tokken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg1MjE0MTksImV4cCI6MTU5ODYxNTAxOX0.wbMcRNcUuZqUYp-kgFvPE_ZRJWY41gjxBq1knmWUj_A";
        chai
          .request(server)
          .post("/api/comments")
          .set({ Authorization: tokken })
          .send(comment)
          .end((err, response) => {
              response.should.have.status(404);
              response.body.should.be.a('object');
              response.body.should.have.property('message').eq('comment are related with a post');
          });
      });

      it("should not post a comment", () => {
        const comment = {
          name: "joshnson",
          email: "josh@gmail.com",
          comment: "here is my comment",
        
        };
        const tokken =
          "eyhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg1MjE0MTksImV4cCI6MTU5ODYxNTAxOX0.wbMcRNcUuZqUYp-kgFvPE_ZRJWY41gjxBq1knmWUj_A";
        chai
          .request(server)
          .post("/api/comments")
          .set({ Authorization: tokken })
          .send(comment)
          .end((err, response) => {
              response.should.have.status(401);
              response.body.should.be.a('object');
              response.body.should.have.property('error').eq('invalid token');
          });
      });
  });
});
