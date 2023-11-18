const express= require("express");
const router= express.Router();

//import controller
const {createComment} = require("../controllers/commentsController");
const { createPost,getAllPosts } = require("../controllers/postsController");
const { dummyLink,likePost,unlikePost} = require("../controllers/likesController");


//mapping create
router.get("/dummyroute",dummyLink);
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);


//export
module.exports=router;