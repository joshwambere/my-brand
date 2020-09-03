let chai = require("chai");
let server = require("../index.js");
let chaiHttp = require("chai-http");
const should = chai.use(chaiHttp).should();
describe("DELETE post", () => {
  /*
   * DELETE Post
   */
  describe("DELETE api/posts/id", () => {
    /**
     * Provide collect id
     */
    it("should Delete a post", () => {
      let id = "5f46d02f6a086fa5422e7233";
      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg4NjA5MTEsImV4cCI6MTU5ODk1NDUxMX0.a8y4oSxId-TcZYC7OtkrIf2Y4tQa0mZckAjgSGV7rdg";
      chai
        .request(server)
        .delete("/api/posts/" + id)
        .set({ Authorization: adminToken })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have
            .property("message")
            .eq("post deleted successfuly");
         
        });
    });

    /**
     * Provide incollect id
     */
    it("should Not Delete a post", () => {
      let id = "5f46d02f6a086fa5422e723";
      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg4NjA5MTEsImV4cCI6MTU5ODk1NDUxMX0.a8y4oSxId-TcZYC7OtkrIf2Y4tQa0mZckAjgSGV7rdg";
      chai
        .request(server)
        .delete("/api/posts/" + id)
        .set({ Authorization: adminToken })
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.have.property("error").eq("Post doesn't exist!");
          
        });
    });
  });
});
