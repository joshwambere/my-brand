const express = require("express")
const router = express.Router()

module.exports = router

router.post("/posts", async (req, res) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    })
    await post.save()
    res.send(post)
  })