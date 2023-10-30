const {Router} = require("express");

const postController = require("../controllers/post.js")
const postRouter = Router();

postRouter.get("/", postController.index)
postRouter.post("/", postController.create);
postRouter.get("/:id", postController.show)

module.exports = postRouter;