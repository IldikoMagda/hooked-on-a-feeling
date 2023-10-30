const Post = require("../models/Post.js");

async function index(req, res) {
  try {
    const posts = await Post.getAll();
    console.log(posts)
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ "error": err.message });
  }
}

async function show(req, res) {
  try {
    const id = req.params.id
    const post = await Post.getPostsByUserId(id);
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({"error": err.message})
  }
}

async function create(req, res) {
    try {
        const data = req.body;
        console.log(data)
        const newPost = await Post.create(data);
        res.status(201).json(newPost);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

async function update(req, res) {
  try {
      const id = parseInt(req.params.id);
      console.log(id)
      const data = req.body;
      const post = await Post.getPostsByItemId(id);
      console.log("Test",post)
      const result = await post.updatePost(data,id);
      res.status(200).json(result)
  } catch (err) {
      res.status(404).json({error: err.message})
  }
}


//create
//update (split into complete, updateInfo, etc?)
//destroy

module.exports = {
  index, show,create,update
};
