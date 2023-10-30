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
        const response = await db.query("SELECT * FROM post WHERE user_id = $1", [id]);
        return response.rows.map(p => new Post(p));
    }

    static async create(data) {
        const {user_id, title, content,dueDate,subject,completed,repeatable,generalXp,subjectXp } = data;
        let response = await db.query("INSERT INTO post ( post_title, post_content, post_date,post_categories) VALUES ($1, $2,$3,$4) RETURNING post_id;", [post_title, post_content,post_date,post_categories]);
        const newId = response.rows[0].post_id;
        const newPost = await Post.getOneById(newId);
        return newPost;
    }

}

module.exports = Post;