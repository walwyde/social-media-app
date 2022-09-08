const express = require('express')
const router = express.Router()
const control = require('../controllers/userController')
const middleware = require("../middleware/index")
router.use((req,res, next) => {
  res.locals.currentUser = req.user;
  next()
})

router.get("/", control.getPosts)

router.get('/user/:id', control.getUser)

router.get('/newpost', control.createPost)

router.post("/posts", middleware.isLoggedIn ,control.newPost)

router.get("/posts/:id", control.getPost)

router.delete("/posts/:id", middleware.ownershipCheck , control.deletePost )

router.post('/posts/:id/comments',middleware.isLoggedIn, control.newComment)

router.get("/posts/:post/comments/:comment", control.getComment)

router.delete("/comments/:id", control.deleteComment)

router.put("/posts/:id", middleware.isLoggedIn, control.editPost)

router.get("/posts/:id/edit", control.editForm)

router.get("/login", control.getLogin)

router.get("/logout", control.logout)

router.get("/register", control.getRegister)

router.post("/register", control.register)

router.post("/login",middleware.authenticate, control.login)


module.exports = router
