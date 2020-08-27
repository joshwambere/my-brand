let chai = require("chai");
let server = require("../index.js");
let chaiHttp = require("chai-http");
const should = chai.use(chaiHttp).should();

describe("Posts API", () => {
  //get post
  describe("GET api/posts", () => {
    it("should get all the posts", () => {
      chai
        .request(server)
        .get("/api/posts")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          
        });
    });

    it("shouldn't get any post", () => {
      chai
        .request(server)
        .get("/api/post")
        .end((err, response) => {
          response.should.have.status(404);
          
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
    it("should get post by id", () => {
      const id = "5f4663e66450ec01f0adeed2";
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
          
        });
    });

    /*
     * providing wrong id
     */
    it("shouldn't get any post", () => {
      const id2 = "5f4663e66450ec01f0adeed";
      chai
        .request(server)
        .get("/api/posts/" + id2)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("error").eq("Post doesn't exist!");
          
        });
    });
  });  
});
