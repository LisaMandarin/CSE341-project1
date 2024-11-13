const userRouter = require("express").Router()
const userController = require("../controllers/user")

userRouter.get("/", userController.getAll)
userRouter.get("/:id", userController.getSingle)
userRouter.post("/", userController.createUser)
userRouter.put("/:id", userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

module.exports = userRouter