const bcrypt = require("bcrypt");

const User = require("../models/User")
const Token = require("../models/Token")

//register
async function register(req, res) {
  try {
      const data = req.body;
      const saltRounds = 10;
      const hash = await bcrypt.hash(data["password"], saltRounds);
      data['password'] = hash;
      const result = await User.create(data)
      res.status(201).send(result);
  } catch (err) {
      res.status(400).json({ error: err.message })
  }
};
//login
async function login(req, res) {
  const data = req.body;
  try {
      const user = await User.getOneByUsername(data.username);
      const legit = await bcrypt.compare(data.password, user["password"]); //both . and [] do the same thing
      if (!legit) {
          throw new Error("Incorrect Details")
      } else {
          const token = await Token.create(user.id)
          res.status(200).json({ authenticated: true, token: token.token, user_id: token.user_id })
      }
  } catch (err) {
      res.status(401).json({ error: err.message })
  }
}

//index
async function index(req, res) {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ "error": err.message });
  }
}

//CheckRole
async function CheckRole(req, res) {
  try {
    const id = req.params.id
    const Role = await User.checkRole(id);
    //console.log(Role.role)
    res.status(200).json(Role.role);
  } catch (err) {
    res.status(500).json({ "error": err.message });
  }
}

//indexMaths
async function indexMaths(req, res) {
  try {
    const users = await User.getAllOrderMaths();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ "error": err.message });
  }
}
//indexEnglish
async function indexEnglish(req, res) {
  try {
    const users = await User.getAllOrderEnglish();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ "error": err.message });
  }
}
//indexScience
async function indexScience(req, res) {
  try {
    const users = await User.getAllOrderScience();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ "error": err.message });
  }
}
//show
async function show(req,res) {
  try {
    const id = req.params.id
    const user = await User.getOneById(id);
    res.status(200).json(user);
  }catch (err) {
    res.status(500).json({ "error": err.message });
  }
}
//update (for Xps)
async function update(req,res) {
  try {
    const id = req.params.id
    const data = req.body
    const user = await User.getOneById(id);
    console.log(user)
    const result = await user.update(data, user.user_id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({"error": err.message})
}
}

//more updates

async function updateMaths(req,res) {
  try {
    const id = req.params.id
    const data = req.body
    const user = await User.getOneById(id);
    const result = await user.updateMaths(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({"error": err.message})
}
}
async function updateEnglish(req,res) {
  try {
    const id = req.params.id
    const data = req.body
    const user = await User.getOneById(id);
    const result = await user.updateEnglish(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({"error": err.message})
}
}

async function updateScience(req,res) {
  try {
    const id = req.params.id
    const data = req.body
    const user = await User.getOneById(id);
    const result = await user.updateScience(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({"error": err.message})
}
}

module.exports = {
  register, login, index,indexMaths,indexEnglish,indexScience, show, update , updateMaths,updateEnglish,updateScience,CheckRole
}

