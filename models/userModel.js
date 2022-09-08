const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: false,
    default: null
  },
  password: { 
    type: String,
    minLength: 6,
    maxLength: 12 },
  // comments: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Comments"
  // }]
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
