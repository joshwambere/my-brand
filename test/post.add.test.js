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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg1MjczODIsImV4cCI6MTU5ODYyMDk4Mn0.a78a3atupVg40smgWe0IMamJTdJ-s1YxMtDG7Gl7aJg";
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
        "eyhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg1MjE0MTksImV4cCI6MTU5ODYxNTAxOX0.wbMcRNcUuZqUYp-kgFvPE_ZRJWY41gjxBq1knmWUj_A";
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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGdtYWlsLmNvbSIsImlzYWRtaW4iOmZhbHNlLCJpYXQiOjE1OTg1MjczNTAsImV4cCI6MTU5ODYyMDk1MH0.avhJkCaFlabBMbj0m1skSVfJR-1T4zvJMMJP15Tl6N0";
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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg1MjczODIsImV4cCI6MTU5ODYyMDk4Mn0.a78a3atupVg40smgWe0IMamJTdJ-s1YxMtDG7Gl7aJg";
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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg1MjczODIsImV4cCI6MTU5ODYyMDk4Mn0.a78a3atupVg40smgWe0IMamJTdJ-s1YxMtDG7Gl7aJg";
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
