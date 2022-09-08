const passport = require("passport")
const Posts = require("../models/postsModel")

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
    console.log(post.author.id)
    console.log(req.user._id)
    if ((req.user._id.equals(post.author.id))) {
      return next();
    }
    res.redirect("back")
  } catch(err) {
    console.log(err)
  }
}