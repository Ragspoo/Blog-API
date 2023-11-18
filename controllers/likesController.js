//import model
const Post= require("../models/postModel");
const Like= require("../models/likesModels");

exports.dummyLink = (req,res)=>{
    res.send("This is Dummy page");
}

//like a post
exports.likePost = async(req,res)=>{
    try{
        const {post, user}=req.body;
        const like = new Like({
            post,user,
        });
        const savedLike= await like.save();

        //update to post collection basis on this
        const updatePost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new:true})
        .populate("likes").exec();

        return res.status(200).json({
            post:updatePost,
        });
    }
    catch(error){
        return red.status(400).json({
            error:"Error while liking post",
        });
    }
}

//unlike a post
exports.unlikePost = async(req,res)=>{
    try{
        const {post, like}=req.body;
        //find and delete the like collection 
        const deleteLike= await Like.findOneAndDelete({post:post,_id:like});

        //update to post collection
        const updatePost = await Post.findByIdAndUpdate(post, {$pull: {likes: deleteLike._id}}, {new:true});

        return res.status(200).json({
            post:updatePost,
        });
    }
    catch(error){
        return red.status(400).json({
            error:"Error while unliking post",
        });
    }
}