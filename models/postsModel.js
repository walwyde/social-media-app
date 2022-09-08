const mongoose = require("mongoose");
// const Comments = require("./commentModel")

const postSchema = new mongoose.Schema({
  image: String,
  caption: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    username: String
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments"
  }]
});

module.exports = mongoose.model("Post", postSchema);
