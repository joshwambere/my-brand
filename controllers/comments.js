const Qry = require('../models/query');
const Post = require("../models/Post");

class Comments {
    async addComment(req, res) {
        const qry = new Qry({
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment,
            post_id:req.body.postId,
          });

          const postFound=await Post.findOne({_id:req.body.postId});
          if(!postFound){
            res.status(404).send({ message:'comment are related with a post'}) 
          }else{
            await qry.save();
            res.send({
                data:qry,
                status:'Ok',
                message:'comment added successfuly'
            });
          } 
          
    }
    /*
     * find all comments
    */
    async getComments(req, res) {
        const comments= await Qry.find();
          if(!comments){
            res.status(404).send({ message:'not comment found'}) 
          }else{
            res.status(200).send(comments);
          } 
          
    }

    /**
     * Find comment based on posts
     */

    async getCommentsByPost(req, res) {
        const comments=await Qry.find({post_id:req.body.postId});
        console.log(comments)
          if(!comments){
            res.status(404).send({ message:'not comment found'}) 
          }else{
            res.status(200).send(comments);
          } 
          
    }



}
module.exports = Comments;
