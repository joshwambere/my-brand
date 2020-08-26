let chai = require("chai");
let server = require("../index.js");
let chaiHttp = require("chai-http");
const should = chai.use(chaiHttp).should();

describe("Posts API", () => {
  //get post
  describe("GET api/posts", () => {
    it("should get all the posts", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    it("shouldn't get any post", (done) => {
      chai
        .request(server)
        .get("/api/post")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /*
   * GET one post using its (ID)
   */
  describe("GET api/posts", () => {
    /*
     * providing correct post id
     */
    it("should get one post with provided id", (done) => {
      const id = "5f45a6d465126b2085054f65";
      chai
        .request(server)
        .get("/api/posts/" + id)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("content");
          response.body.should.have.property("title");
          response.body.should.have.property("img");
          response.body.should.have.property("_id").eq(id);
          done();
        });
    });

    /*
     * providing wrong id
     */
    it("shouldn't get any post", (done) => {
      const id2 = "65f45a6d465126b2085054f65";
      chai
        .request(server)
        .get("/api/posts/" + id2)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("Post doesn't exist!");
          done();
        });
    });
  });

  /*
   * POST one post
   */
  describe("POST api/posts", () => {
    /*
     * providing correct post id
     */
    it("should post one post", (done) => {
      const post={
        title:"new title for testing",
        content:"new content for testing",
        img:"image location"
      }
      const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg0Mjc3ODgsImV4cCI6MTU5ODQzMTM4OH0.bCS16YZxBIFcwuhQ3ylspW-N8RDfg-kDjGRBkDgJt5A"
      chai
        .request(server)
        .post("/api/posts/")
        .set({"Authorization": token})
        .send(post)
        .end((err, response) => {
          response.should.have.status(201);
          
          done();
        });
    });

    /*
     * providing wrong id
     */
    it("shouldn't get any post", (done) => {
      const id2 = "65f45a6d465126b2085054f65";
      chai
        .request(server)
        .get("/api/posts/" + id2)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("Post doesn't exist!");
          done();
        });
    });
  });
});
