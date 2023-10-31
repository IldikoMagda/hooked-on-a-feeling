const db = require("../database/connect")

class User {
  
  constructor({user_id, username,password,generalxp, subjectxpmaths,subjectxpenglish, subjectxpscience,role,favcolor}) {
    this.id = user_id;
    this.username = username;
    this.password = password;
    this.generalxp = generalxp;
    this.subjectxpmaths = subjectxpmaths;
    this.subjectxpenglish = subjectxpenglish;
    this.subjectxpscience = subjectxpscience;
    this.role = role;
    this.favcolor = favcolor;

  }

  //getAll (order by generalXP)
  static async getAll() {
    const response = await db.query("SELECT * FROM user_account ORDER BY generalXp DESC");
    return response.rows.map(el => new User(el));
  }
  //get All (order by maths)
  static async getAllOrderMaths() {
    const response = await db.query("SELECT * FROM user_account ORDER BY subjectXpMaths DESC");
    return response.rows.map(el => new User(el));
  }
  //get All (order by english)
  static async getAllOrderEnglish() {
    const response = await db.query("SELECT * FROM user_account ORDER BY subjectXpEnglish DESC");
    return response.rows.map(el => new User(el));
  }
  //get All (order by science)
  static async getAllOrderScience() {
    const response = await db.query("SELECT * FROM user_account ORDER BY subjectXpScience DESC");
    return response.rows.map(el => new User(el));
  }
  //getOneById
  static async getOneById(id) {
    const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
    if (response.rows.length != 1) {
        throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
}

static async checkRole(id) {
  const response = await db.query("SELECT role FROM user_account WHERE user_id = $1", [id]);
  if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
  }
  return new User(response.rows[0]);
}

  //getOneByUsername
  static async getOneByUsername(username) {
    const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
    if (response.rows.length != 1) {
        throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
}


  //create
  static async create(data) {
    const { username, password, favColor } = data;
    let response = await db.query("INSERT INTO user_account (username, password, favColor) VALUES ($1, $2, $3) RETURNING user_id;",
        [username, password, favColor]);
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
}
  // update (for XPs)
  async update(data) {
    let response = await db.query("UPDATE user_account SET generalXp = $1 WHERE user_id = $2 RETURNING *", [data.generalXp, this.id]);
    if (response.rows.length != 1) {
      throw new Error("Unable to update user.")
    }
    return new User(response.rows[0]);
  }
  //more updates
  async updateMaths(data) {
    let response = await db.query("UPDATE user_account SET subjectXpMaths = $1 WHERE user_id = $2 RETURNING *", [data.subjectXpMaths, this.id]);
    if (response.rows.length != 1) {
      throw new Error("Unable to update notes.")
    }
    return new User(response.rows[0]);
  }
  async updateEnglish(data) {
    let response = await db.query("UPDATE user_account SET subjectXpEnglish = $1 WHERE user_id = $2 RETURNING *", [data.subjectXpEnglish, this.id]);
    if (response.rows.length != 1) {
      throw new Error("Unable to update notes.")
    }
    return new User(response.rows[0]);
  }
  async updateScience(data) {
    let response = await db.query("UPDATE user_account SET subjectXpScience = $1 WHERE user_id = $2 RETURNING *", [data.subjectXpScience, this.id]);
    if (response.rows.length != 1) {
      throw new Error("Unable to update notes.")
    }
    return new User(response.rows[0]);
  }



  //need destroy?
}


module.exports = User