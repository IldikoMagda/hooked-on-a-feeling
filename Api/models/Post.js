const db = require('../database/connect');

class Post {

    constructor({ Item_id, user_id, title, content,dueDate,subject,completed,repeatable,generalXp,subjectXp}) {
        this.Item_id = Item_id;
        this.user_id =user_id
        this.title = title;
        this.content = content;
        this.date =dueDate;
        this.subject =subject;
        this.completed =completed;
        this.repeatable =repeatable;
        this.generalXp =generalXp;
        this.subjectXp =subjectXp;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM post");
        return response.rows.map(p => new Post(p));
    }

    static async getPostsById(id) {
        const response = await db.query("SELECT * FROM post WHERE Item_id = $1", [id]);
        const posts = response.rows.map(p => new Post(p));
        return posts.length > 0 ? posts[0] : null;
    }

    static async create(data) {
        const {user_id, title, content,dueDate,subject,completed="FALSE",repeatable="FALSE",generalXp,subjectXp } = data;
        let response = await db.query("INSERT INTO post ( user_id, title, content,dueDate,subject,completed,repeatable,generalXp,subjectXp ) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9) RETURNING user_id;", [user_id, title, content,dueDate,subject,completed,repeatable,generalXp,subjectXp ]);
        //const newId = response.rows[-1].post_id;
        //const newPost = await Post.getOneById(newId);
        return response;
    }

}

module.exports = Post;