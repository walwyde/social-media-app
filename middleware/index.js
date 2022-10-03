const passport = require("passport")
const Posts = require("../models/postsModel")
const Comments = require("../models/commentModel")

exports.authenticate =  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}
exports.ownershipCheck = async (req, res, next) => {
  try {
    console.log(req.params.id)
    const post = await Posts.findById(req.params.id)

    if (post.author.id.equals(req.user._id)) {
      post.comments.forEach(comment => {
        const deletedComment = Comments.findByIdAndRemove(comment._id)
        if (deletedComment) {
          console.log("comment Deleted")
        } else {console.log("comment not deleted")}
      })
      return next();
    }
    res.redirect("back")
  } catch(err) {
    console.log(err)
  }
}
exports.commentAuth = async (req, res, next) => {
  try {
    const comment = await Comments.findOne({id: req.params.id})
    console.log(comment)
    console.log(comment.author.username + " auth")
    if (req.user && comment.author.id.equals(req.user._id)) {
      return next()
    } else {
      res.redirect("back")
      console.log("you do not have permission to do that")
    }
  } catch(err) {
    if (err) {
      console.log(err)
    }
  }
}
exports.clearComments = (req, res, next) => {
  try {
    const post = req.params
    const deleted = Posts.findOne({id: post})
    if(!deleted){
      console.log("post not found")
    } else {
      
    }
  } catch(err) {
    console.log(err)
  }
}