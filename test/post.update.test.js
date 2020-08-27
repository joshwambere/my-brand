let chai = require("chai");
let server = require("../index.js");
let chaiHttp = require("chai-http");
const should = chai.use(chaiHttp).should();

describe("Update post", () => {
  /*
   * UPDATE post
   */
  describe("Update api/posts/id", () => {
    /*
     * providing correct routes and  correct info
     */
    it("should update a post", () => {
      let post = {
        title: "new title updated",
        content: "new content for testing updated ",
        image: "image location updated",
      };
      let id = "5f46cc4b9e48559902e87f1e";
      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg1MjczODIsImV4cCI6MTU5ODYyMDk4Mn0.a78a3atupVg40smgWe0IMamJTdJ-s1YxMtDG7Gl7aJg";
      chai
        .request(server)
        .patch("/api/posts/" + id)
        .set({ Authorization: adminToken })
        .send(post)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eq("post updated succeddfuly");
          response.body.should.have.property("data");
        });
    });

    /*
     * providing unauthorized User
     */
    it("should not be able to update ", (done) => {
      const post = {
        title: "new title for testing up",
        content: "new content for testing up",
        image: "image location",
      };
      const id = "5f46cc4b9e48559902e87f1e";
      const reguralToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGdtYWlsLmNvbSIsImlzYWRtaW4iOmZhbHNlLCJpYXQiOjE1OTg1MjczNTAsImV4cCI6MTU5ODYyMDk1MH0.avhJkCaFlabBMbj0m1skSVfJR-1T4zvJMMJP15Tl6N0";
      chai
        .request(server)
        .patch("/api/posts/" + id)
        .set({ Authorization: reguralToken })
        .send(post)
        .end((err, response) => {
          response.should.have.status(403);
          response.body.should.be.a("object");
          response.body.should.have
            .property("error")
            .eq("Only admins can access this");
          done();
        });
    });

    /*
     * providing wrong post id
     */
    it("should not be able to update", (done) => {
      const post = {
        title: "new title for testing update",
        content: "new content for testing update",
        image: "image location",
      };
      const id = "5f46cc4b9e48559902e87f1";
      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg1MjczODIsImV4cCI6MTU5ODYyMDk4Mn0.a78a3atupVg40smgWe0IMamJTdJ-s1YxMtDG7Gl7aJg";
      chai
        .request(server)
        .patch("/api/posts/" + id)
        .set({ Authorization: adminToken })
        .send(post)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("Post doesn't exist!");
          done();
        });
    });
  });
});
