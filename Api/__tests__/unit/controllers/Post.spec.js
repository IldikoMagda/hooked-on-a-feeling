const request = require('supertest')
const app = require('../../../app')
const { resetTestDB } = require('./config')


describe('API Endpoints', () => {
    let api 
    beforeEach(async () => {
        await resetTestDB()
      })
    
    beforeAll(() => {
        api = app.listen(4000, () => {
          console.log('Test server running on port 4000')
        })
    })
    afterAll((done) => {
      console.log('Gracefully closing server')
      api.close(done)
    })
    test('responds to GET / with a 200 status code', (done) => {
        request(api).get('/').expect(200, done)
      })
    test('responds to GET', async () => {
        const response = await request(api).get('/')
        expect(response.statusCode).toBe(200)
    })
    
    test('responds to /posts', async () => {
        const response = await request(api).get('/posts')
        expect(response.statusCode).toBe(200)
    })

    test('responds to /users', async () => {
        const response = await request(api).get('/users')
        expect(response.statusCode).toBe(200)
    })
    test('responds to POST /posts with a new post', async () => {
        const postData = {
          user_id: 1,
          title: 'New Post',
          content: 'New Content',
          dueDate: '2023-12-31',
          subject: 'Math',
        };
    
        const response = await request(api)
          .post('/posts')
          .send(postData);
    
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(postData.title);
      });
    
      test('responds to PUT /posts/:id with an updated post', async () => {
        const postId = 1; 
        const updatedData = {
          title: 'Updated Post',
          content: 'Updated Content',
          dueDate: '2024-01-01',
          subject: 'Science',
        };
    
        const response = await request(api)
          .put(`/posts/${postId}`)
          .send(updatedData);
    
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(updatedData.title);
      });
    
      test('responds to DELETE /posts/:id with a deleted post', async () => {
        const postId = 1; 
    
        const response = await request(api).delete(`/posts/${postId}`);
    
        expect(response.statusCode).toBe(200);
        expect(response.body.item_id).toBe(postId);
      });
});