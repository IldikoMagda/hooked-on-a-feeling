const {Router} = require("express");

const userController = require("../controllers/user.js")
const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
//for leaderboard
userRouter.get("/", userController.index)
userRouter.get("/maths", userController.indexMaths)
userRouter.get("/english", userController.indexEnglish)
userRouter.get("/science", userController.indexScience)
userRouter.get("/:id", userController.show)
userRouter.patch("/:id", userController.update)
userRouter.patch("/maths/:id", userController.updateMaths)
userRouter.patch("/english/:id", userController.updateEnglish)
userRouter.patch("/science/:id", userController.updateScience)

module.exports = userRouter;