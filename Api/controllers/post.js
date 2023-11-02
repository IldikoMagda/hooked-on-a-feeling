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
      console.log(data)
      const itemToUpdate = await Post.getPostsByItemId(id)
      // console.log(itemToUpdate)
      console.log(itemToUpdate.duedate)

      data.title = data.title || itemToUpdate.title
      data.content = data.content || itemToUpdate.content
      data.subject = data.subject || itemToUpdate.subject
      data.duedate = data.duedate || itemToUpdate.duedate
      data.completed = data.completed || itemToUpdate.completed
      data.repeatable = data.repeatable || itemToUpdate.repeatable
      data.generalxp = data.generalxp || itemToUpdate.generalxp
      data.subjectxp = data.subjectxp || itemToUpdate.subjectxp

      // itemToUpdate.title = data.title ? data.title : itemToUpdate.title
      // itemToUpdate.content = data.content ? data.content: itemToUpdate.content
      // itemToUpdate.subject = data.subject ? data.subject : itemToUpdate.subject
      // itemToUpdate.duedate = data.duedate ? data.duedate : itemToUpdate.duedate
      // itemToUpdate.completed = data.completed ? data.completed: itemToUpdate.completed
      // itemToUpdate.repeatable = data.repeatable ? data.repeatable : itemToUpdate.repeatable
      // itemToUpdate.generalxp = data.generalxp ? data.generalxp : itemToUpdate.generalxp
      // itemToUpdate.subjectxp = data.subjectxp ? data.subjectxp : itemToUpdate.subjectxp

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
      res.status(204).json(deletePost);
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
