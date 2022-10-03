const Posts = require("../models/postsModel");
const Comments = require("../models/commentModel");
const Users = require("../models/userModel");
const passport = require("passport");
const localStrategy = require("passport-local");
 
exports.getPosts = (req, res) => {
  Posts.find({}, (err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { posts: posts });
    }
  });
};

exports.newPost = (req, res) => {
  const { image, caption } = req.body.post;
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  Posts.create(
    { image: image, caption: caption, author: author },
    (err, newpost) => {
      if (err) {
        console.log(err);
      } else {
        return res.redirect("/");
      }
    }
  );
};
exports.createPost = (req, res) => {
  res.render("newPost");
};
exports.getUser = (req, res) => {
  Users.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.render("profile", { user: user });
    }
  });
};
exports.getPost = (req, res) => {
  Posts.findById(req.params.id)
    .populate("comments")
    .exec((err, post) => {
      if (err) {
        console.log(err);
      } else {
        res.render("post", { post: post });
      }
    });
};

exports.deletePost = (req, res) => {
  console.log(req.params.id);
  Posts.findOneAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
};
exports.newComment = async (req, res) => {
  try {
    console.log(req.body.comment)
    if (req.body.comment.content.length === 0) {
      console.log("comment cannot be blank")
      res.redirect("back")
    } else {
      const comment = await Comments.create(req.body.comment);
      comment.author.username = await req.user.username;
      comment.author.id = await req.user._id;
      comment.save();
      const post = await Posts.findById(req.params.id);
      console.log(comment)
      post.comments.push(comment);
      post.save();
      res.redirect("back");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getComment = (req, res) => {
  Comments.findById(req.params.comment, (err, comment) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.params);
      res.render("comment", { comment: comment });
    }
  });
};
exports.deleteComment = async (req, res) => {
  try {
    let buffer = [];
    console.log(req.params.comment);
    const deleted = await Comments.findByIdAndRemove(req.params.comment);
    removed = req.params.comment;
    const post = await Posts.findById(req.params.post);
    post.comments.filter((array) => {
      if (!array._id.equals(removed)) {
        buffer.push(array);
      }
    });
    post.comments = buffer;
    post.save();
    if (!deleted) {
      res.redirect("back");
    }
    res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};
exports.editForm = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      res.redirect("back");
    }
    console.log(post);
    res.render("edit-post", { post: post });
  } catch (err) {
    console.log(err);
  }
};
exports.editPost = async (req, res) => {
  try {
    const updatedPost = await Posts.findByIdAndUpdate(
      req.params.id,
      req.body.post
    );
    if (!updatedPost) {
      res.redirect("/");
    }
    res.redirect("/posts/" + req.params.id);
  } catch (err) {
    console.log(err);
  }
};
exports.getLogin = (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
  }
};
exports.getRegister = async (req, res) => {
  try {
    res.render("register");
  } catch (err) {
    console.log(err);
  }
};
exports.register = (req, res) => {
  const { username, email } = req.body.user;
  const password = req.body.password;

  if (!(username && email && password)) {
    res.redirect("/register");
    console.log("all inputs required");
  } else {
    Users.register(new Users(req.body.user), req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        return res.redirect("back");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/login");
        });
      }
    });
    res.redirect("/login");
  }
};
exports.login = (req, res) => {};


exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      res.redirect("back");
    }
    res.redirect("/login");
  });
};
