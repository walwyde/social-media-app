const express      = require("express");
const app          = express();
const { json }     = require("express");
const userRoutes   = require("./routes/user-routes");
const mongoose     = require("mongoose")
const method       = require("method-override")
const localStrategy = require("passport-local")
const passport     = require("passport")
const Users        = require("./models/userModel")

mongoose.connect("mongodb://localhost/blog_app", (err) => {
  if (err){
    console.log(err)
  } else {
    console.log("sucessfully connected to database")
  }
})
const port = process.env.PORT || 3000;


app.set("view engine", "ejs");

app.use(require("express-session")({
  secret: "this is the express-session app.use",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
})

app.use(json())
app.use(method("_method"))
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))





app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`api running on ${port}`);
});
