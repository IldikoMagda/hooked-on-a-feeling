const request = require('supertest');
const express = require('express');
const app = express();
const routes = require('../../../routers/post');

app.use(express.json());

// Mock your Post module
jest.mock('../../../models/Post', () => {
  return {
    getAll: jest.fn(),
    getPostsByUserId: jest.fn(),
    getPostsByItemId: jest.fn(),
    create: jest.fn(),
    updatePost: jest.fn(),
    destroy: jest.fn(),
  };
});

const Post = require('../../../controllers/post'); 

app.get('/posts', routes.index);
app.get('/users/:id/posts', routes.showUserPosts);
app.get('/posts/:id', routes.showPost);
app.post('/posts', routes.create);
app.put('/posts/:id', routes.update);
app.delete('/posts/:id', routes.destroy);

describe('API Endpoints', () => {
  it('should return all posts', async () => {
    Post.getAll.mockResolvedValueOnce([
      { title: 'Post 1', content: 'Content 1' },
      { title: 'Post 2', content: 'Content 2' },
    ]);

    const response = await request(app).get('/posts');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it('should return user posts', async () => {
    const userId = 1;
    Post.getPostsByUserId.mockResolvedValueOnce({ user_id: userId, title: 'User Post' });

    const response = await request(app).get(`/users/${userId}/posts`);
    expect(response.status).toBe(200);
    expect(response.body.user_id).toBe(userId);
  });

  it('should return a specific post', async () => {
    const postId = 1;
    Post.getPostsByItemId.mockResolvedValueOnce({ item_id: postId, title: 'Specific Post' });

    const response = await request(app).get(`/posts/${postId}`);
    expect(response.status).toBe(200);
    expect(response.body.item_id).toBe(postId);
  });

  it('should create a new post', async () => {
    const postData = { title: 'New Post', content: 'New Content' };
    Post.create.mockResolvedValueOnce({ ...postData, item_id: 1 });

    const response = await request(app)
      .post('/posts')
      .send(postData);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(postData.title);
  });

  it('should update a post', async () => {
    const postId = 1;
    const updatedData = { title: 'Updated Post', content: 'Updated Content' };
    Post.updatePost.mockResolvedValueOnce({ item_id: postId, ...updatedData });

    const response = await request(app)
      .put(`/posts/${postId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.item_id).toBe(postId);
    expect(response.body.title).toBe(updatedData.title);
  });

  it('should delete a post', async () => {
    const postId = 1;
    Post.destroy.mockResolvedValueOnce({ item_id: postId, title: 'Deleted Post' });

    const response = await request(app).delete(`/posts/${postId}`);
    expect(response.status).toBe(200);
    expect(response.body.item_id).toBe(postId);
  });
});