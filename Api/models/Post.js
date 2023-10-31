const db = require('../database/connect');

class Post {

    constructor({ item_id, user_id, title, content,duedate,subject,completed,repeatable, generalxp, subjectxp}) {
        this.item_id = item_id;
        this.user_id =user_id
        this.title = title;
        this.content = content;
        this.duedate =duedate;
        this.subject =subject;
        this.completed =completed;
        this.repeatable =repeatable;
        this.generalxp =generalxp;
        this.subjectxp =subjectxp;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM post");
        return response.rows.map(p => new Post(p));
    }

    static async getPostsByUserId(id) {
        console.log("P1")
        const response = await db.query("SELECT * FROM post WHERE user_id = $1", [id]);
        const posts = response.rows.map(p => new Post(p));
        return posts.length > 0 ? posts[0] : null;
    }

    static async getPostsByItemId(id) {
        const response = await db.query("SELECT * FROM post WHERE item_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Post(response.rows[0]);
    }

    static async create(data) {
        const {user_id, title, content,dueDate,subject,completed="FALSE",repeatable="FALSE",generalXp,subjectXp } = data;
        let response = await db.query("INSERT INTO post ( user_id, title, content,dueDate,subject,completed,repeatable,generalXp,subjectXp ) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9) RETURNING item_id;", [user_id, title, content,dueDate,subject,completed,repeatable,generalXp,subjectXp ]);
        const newId = response.rows[0].item_id;
        //console.log(response.rows[0].item_id)
        const newPost = await Post.getPostsByItemId(newId);
        return newPost;
    }

    static async updatePost(data,id) {
        const {title, content,dueDate,subject,completed="FALSE",repeatable="FALSE",generalXp,subjectXp } = data;
        const response = await db.query("UPDATE post SET title= $1, content=$2, dueDate=$3,subject =$4,completed =$5,repeatable =$6,generalXp =$7,subjectXp =$8 WHERE item_id= $9 RETURNING *;",[ title, content,dueDate,subject,completed,repeatable,generalXp,subjectXp ,id ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update Post.")
        }
        return new Post(response.rows[0]);
    }
    
    static async destroy(id) {
        let response = await db.query("DELETE FROM post WHERE item_id = $1 RETURNING *;", [id]);
        return new Post(response.rows[0]);
    }

}

module.exports = Post;