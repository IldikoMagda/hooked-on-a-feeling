const Post = require("../models/Post.js");
const User = require("../models/User.js");

async function index(req, res) {
  try {
    const posts = await Post.getAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ "error": err.message });
  }
}

async function showUserPosts(req, res) {
  try {
    const id = req.params.id
    const post = await Post.getPostsByUserId(id);
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({"error": err.message})
  }
}

async function showPost(req, res) {
  try {
    const id = req.params.id
    const post = await Post.getPostsByItemId(id);
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({"error": err.message})
  }
}

async function create(req, res) {
    try {
        const data = req.body;
        const id = data.user_id
        const Check = await User.checkRole(id);
        const Role= Check.role
        if (Role === "Student"){console.log("Student")}
        else {console.log("Teacher")}
        const newPost = await Post.create(data);
        //const newPost = await Post.createTeacher(data);
        res.status(201).json(newPost);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

async function update(req, res) {
  try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const updatePost = await Post.updatePost(data,id);
      res.status(200).json(updatePost)
  } catch (err) {
      res.status(404).json({error: err.message})
  }
}

async function destroy(req, res) {
  try {
      const id = req.params.id;
      const deletePost = await Post.destroy(id);
      res.json(deletePost);
  } catch (err) {
      res.status(404).json({error: err.message})
  }
}


//create
//update (split into complete, updateInfo, etc?)
//destroy

module.exports = {
  index, showUserPosts,showPost,create,update,destroy
};
