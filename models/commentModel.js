const mongoose = require("mongoose")

const commentModel = new mongoose.Schema({
  content: String,
  time: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    username: String
  }
})

module.exports = mongoose.model("Comments", commentModel)