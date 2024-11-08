const userRouter = require("express").Router()
const userController = require("../controllers/user")

userRouter.get("/", userController.getAll)
userRouter.get("/:id", userController.getSingle)

module.exports = userRouter