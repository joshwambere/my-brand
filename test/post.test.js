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
    it("should get post by id", (done) => {
      const id = "5f46663fe7d2ce09d86aff84";
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
      const id2 = "5f465e7eca4232f1c498e3";
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
     * providing correct routes and  correct info
     */
    it("should post one post", (done) => {
      let post = {
        title: "new title",
        content: "new content for testing",
        image: "image location",
      };

      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg0NzI3MTgsImV4cCI6MTU5ODQ5NDMxOH0.4Ae_SjDXmSA4-2BHbLybwjXkk6B-6TXSEAT8beKyLUE";
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

          done();
        });
    });

    /*
     * providing wrong tokken
     */
    it("should not be able to post any post", (done) => {
      const post = {
        title: "new title for testing",
        content: "new content for testing",
        img: "image location",
      };
      const token =
        "eJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg0NzI3MTgsImV4cCI6MTU5ODQ5NDMxOH0.4Ae_SjDXmSA4-2BHbLybwjXkk6B-6TXSEAT8beKyLUE";
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
        img: "image location",
      };
      const reguralToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGdtYWlsLmNvbSIsImlzYWRtaW4iOmZhbHNlLCJpYXQiOjE1OTg0NzMwNTUsImV4cCI6MTU5ODQ5NDY1NX0.rfoMVxk3an2rZ0p9_oxYRRfXpYYkjwxpY6IAE3JMElI";
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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg0NzI3MTgsImV4cCI6MTU5ODQ5NDMxOH0.4Ae_SjDXmSA4-2BHbLybwjXkk6B-6TXSEAT8beKyLUE";
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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg0NzI3MTgsImV4cCI6MTU5ODQ5NDMxOH0.4Ae_SjDXmSA4-2BHbLybwjXkk6B-6TXSEAT8beKyLUE";
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

  /*
   * UPDATE post
   */
  describe("Update api/posts/id", () => {
    /*
     * providing correct routes and  correct info
     */
    it("should update a post", (done) => {
      let post = {
        title: "new title updated",
        content: "new content for testing updated ",
        image: "image location updated",
      };
      let id = "5f46663fe7d2ce09d86aff84";
      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg0NzI3MTgsImV4cCI6MTU5ODQ5NDMxOH0.4Ae_SjDXmSA4-2BHbLybwjXkk6B-6TXSEAT8beKyLUE";
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

          done();
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
      const id = "5f46663fe7d2ce09d86aff84";
      const reguralToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGdtYWlsLmNvbSIsImlzYWRtaW4iOmZhbHNlLCJpYXQiOjE1OTg0NzMwNTUsImV4cCI6MTU5ODQ5NDY1NX0.rfoMVxk3an2rZ0p9_oxYRRfXpYYkjwxpY6IAE3JMElI";
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
      const id = "5465e7eca4232f1c498e3a3";
      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg0NzI3MTgsImV4cCI6MTU5ODQ5NDMxOH0.4Ae_SjDXmSA4-2BHbLybwjXkk6B-6TXSEAT8beKyLUE";
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

  /*
   * DELETE Post
   */
  describe("DELETE api/posts/id", () => {
    /**
     * Provide collect id
     */
    it("should Delete a post", (done) => {
      let id = "5f46663fe7d2ce09d86aff84";
      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg0NzI3MTgsImV4cCI6MTU5ODQ5NDMxOH0.4Ae_SjDXmSA4-2BHbLybwjXkk6B-6TXSEAT8beKyLUE";
      chai
        .request(server)
        .delete("/api/posts/" + id)
        .set({ Authorization: adminToken })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have
            .property("message")
            .eq("post deleted successfuly");
          done();
        });
    });

    /**
     * Provide incollect id
     */
    it("should Delete a post", (done) => {
      let id = "5f46663fe7d2ce09d86aff84";
      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvMkBnbWFpbC5jb20iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1OTg0NzI3MTgsImV4cCI6MTU5ODQ5NDMxOH0.4Ae_SjDXmSA4-2BHbLybwjXkk6B-6TXSEAT8beKyLUE";
      chai
        .request(server)
        .delete("/api/posts/" + id)
        .set({ Authorization: adminToken })
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.have.property("error").eq("Post doesn't exist!");
          done();
        });
    });
  });
});
