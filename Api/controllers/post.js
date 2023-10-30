const Post = require("../models/Post.js");

async function index(req, res) {
  try {
    const posts = await Post.getAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ "error": err.message });
  }
}

async function show(req, res) {
  try {
    const id = req.params.id
    const post = await Post.getOneById(id);
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({"error": err.message})
  }
}

//create
//update (split into complete, updateInfo, etc?)
//destroy

module.exports = {
  index, show
};
