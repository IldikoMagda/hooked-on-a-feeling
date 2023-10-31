const {Router} = require("express");

const postController = require("../controllers/post.js")
const authenticator = require("../middleware/authenticator");

const postRouter = Router();

postRouter.get("/", postController.index)
postRouter.post("/", postController.create);
postRouter.get("/:id", postController.showUserPosts) //Get all the posts from a specific user
postRouter.get("/Post/:id", postController.showPost) // Get the post with the post_id
postRouter.patch("/Post/:id", postController.update); // Update the post with the post_id
postRouter.delete("/Post/:id", postController.destroy);// Delete the post with the post_id

//postRouter.get("/", authenticator, postController.index);

module.exports = postRouter;