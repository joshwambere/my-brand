let chai = require("chai");
let server = require("../index.js");
let chaiHttp = require("chai-http");
const should = chai.use(chaiHttp).should();


describe("Add post", () => {
  /*
   * POST one post
   */
  describe("POST api/posts", () => {
    /*
     * providing correct routes and  correct info
     */
    it("should post one post", () => {
      let post = {
        title: "new title",
        content: "new content for testing",
        image: "image location",
      };

      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg4NjA5MTEsImV4cCI6MTU5ODk1NDUxMX0.a8y4oSxId-TcZYC7OtkrIf2Y4tQa0mZckAjgSGV7rdg";
      chai
        .request(server)
        .post("/api/posts/")
        .set({ Authorization: adminToken })
        .send(post)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eq("post created successfuly");
          response.body.should.have.property("data");
        });
    });

    /*
     * providing wrong tokken
     */
    it("should not be able to post any post", (done) => {
      const post = {
        title: "new times roman",
        content: "new content for testing",
        image: "image location",
      };
      const token =
        "eJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg4NjA5MTEsImV4cCI6MTU5ODk1NDUxMX0.a8y4oSxId-TcZYC7OtkrIf2Y4tQa0mZckAjgSGV7rdg";
      chai
        .request(server)
        .post("/api/posts/")
        .set({ Authorization: token })
        .send(post)
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("invalid token");
          done();
        });
    });

    /*
     * providing unauthorized User
     */
    it("should not be able to post", (done) => {
      const post = {
        title: "new title for testing",
        content: "new content for testing",
        image: "image location",
      };
      const reguralToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGdtYWlsLmNvbSIsImlzYWRtaW4iOmZhbHNlLCJpYXQiOjE1OTg4NjEzMTMsImV4cCI6MTU5ODk1NDkxM30.orLS9PRLB1hd2WPs0dDJFfLTkAXgHIM8ueSXlj-gYoA";
      chai
        .request(server)
        .post("/api/posts/")
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
     * providing empty fields
     */
    it("should not be able to post", (done) => {
      const post = {
        title: "new title for testing",
        content: "new content for testing",
        content: "",
      };
      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg4NjA5MTEsImV4cCI6MTU5ODk1NDUxMX0.a8y4oSxId-TcZYC7OtkrIf2Y4tQa0mZckAjgSGV7rdg";
      chai
        .request(server)
        .post("/api/posts/")
        .set({ Authorization: adminToken })
        .send(post)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eq("please fill in all the fields");
          done();
        });
    });

    /*
     * providing missing fields
     */
    it("should not be able to post", (done) => {
      const post = {
        title: "new title for testing",
      };
      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg4NjA5MTEsImV4cCI6MTU5ODk1NDUxMX0.a8y4oSxId-TcZYC7OtkrIf2Y4tQa0mZckAjgSGV7rdg";
      chai
        .request(server)
        .post("/api/posts/")
        .set({ Authorization: adminToken })
        .send(post)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eq("please fill in all the fields");
          done();
        });
    });
  });
});
