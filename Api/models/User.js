const db = require("../database/connect")

class User {
  
  constructor({user_id, username,password,generalXp, subjectXpMaths,subjectXpEnglish, subjectXpScience}) {
    this.id = user_id;
    this.username = username;
    this.password = password;
    this.generalXp = generalXp;
    this.subjectXpMaths = subjectXpMaths;
    this.subjectXpEnglish = subjectXpEnglish;
    this.subjectXpScience = subjectXpScience;
  }

  //getAll (order by generalXP)
  static async getAll() {
    const response = await db.query("SELECT * FROM user_account ORDER BY generalXp");
    return response.rows.map(el => new User(el));
  }
  //get All (order by maths)
  static async getAllOrderMaths() {
    const response = await db.query("SELECT * FROM user_account ORDER BY subjectXpMaths");
    return response.rows.map(el => new User(el));
  }
  //get All (order by english)
  static async getAllOrderEnglish() {
    const response = await db.query("SELECT * FROM user_account ORDER BY subjectXpEnglish");
    return response.rows.map(el => new User(el));
  }
  //get All (order by science)
  static async getAllOrderScience() {
    const response = await db.query("SELECT * FROM user_account ORDER BY subjectXpScience");
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
  //getOneByUsername
  static async getOneByUsername(username) {
    const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
    if (response.rows.length != 1) {
        throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
}

  //create
  // update
  // destroy
  

}


module.exports = User