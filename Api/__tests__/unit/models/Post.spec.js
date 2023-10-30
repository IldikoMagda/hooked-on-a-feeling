const db = require('../../../database/connect');
const Post = require('../../../models/Post');

describe('Post Model Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    //model/ getAll
    describe('getAll', () => {
        it('resolves with post on success', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [
                    {
                        Item_id: 1,
                        user_id: 1,
                        title: 'Title',
                        content: 'Content',
                        dueDate: '2023-10-09',
                        subject: 'Maths',
                        completed: false,
                        repeatable: false,
                        generalXp: 3,
                        subjectXp: 19,
                    },
                    {
                        Item_id: 2,
                        user_id: 1,
                        title: 'Title 2',
                        content: 'Content 2',
                        dueDate: '2023-10-10',
                        subject: 'English',
                        completed: true,
                        repeatable: true,
                        generalXp: 5,
                        subjectXp: 15,
                    },
                ],
            });

            const posts = await Post.getAll();

            expect(posts).toHaveLength(2);
            expect(posts[0]).toBeInstanceOf(Post);
        });
    });
    //model/ getPostsbyUserId

    describe('getPostsByUserId', () => {
        it('resolves with a post on successful db query', async () => {
            let testPost = {
                item_id: 2,
                user_id: 1,
                title: 'Title 2',
                content: 'Content 2',
                dueDate: '2023-10-10',
                subject: 'English',
                completed: true,
                repeatable: true,
                generalXp: 5,
                subjectXp: 15,
            };
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [testPost] })
    
          const result = await Post.getPostsByUserId(1)
          expect(result).toBeInstanceOf(Post)
          expect(result.title).toBe('Title 2')
          expect(result.item_id).toBe(2)
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue(new Error('This post does not exist!'))
    
          try {
            await Post.getPostsByUserId('red')
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('This post does not exist!')
          }
        })
      })

    //I might have to change it if generalXp becomes generalxp!!! etc
    //// WILL CHANGE WHEN MODEL CHANGES!!! ////
    describe('getPostsByItemId', () => {
        it('resolves with a post on successful db query', async () => {
            let testPost = {
                item_id: 2,
                user_id: 1,
                title: 'Title 2',
                content: 'Content 2',
                dueDate: '2023-10-10',
                subject: 'English',
                completed: true,
                repeatable: true,
                generalXp: 5,
                subjectXp: 15,
            };
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [testPost] });
    
            const result = await Post.getPostsByItemId(2);
            expect(result).toBeInstanceOf(Post);
            expect(result.title).toBe('Title 2');
            expect(result.item_id).toBe(2);
        });
    
        it('should throw an Error on db query error', async () => {
            jest.spyOn(db, 'query').mockRejectedValue(new Error('Unable to locate post.'));
    
            try {
                await Post.getPostsByItemId('red'); 
            } catch (error) {
                expect(error).toBeTruthy();
                expect(error.message).toBe('Unable to locate post.');
            }
        });
    });
    describe('create', () => {
        it('resolves with post on successful db query', async () => {
            let postData = {
                user_id: 1,
                title: "t1",
                content: 'u1',
                dueDate: 2024,
                subject: 'd1',
                generalXp: 1,
                subjectXp: 1
            };
        
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{ ...postData, item_id: 1 }]
            });
        
            const result = await Post.create(postData);
        
            expect(result).toBeTruthy();
            expect(result).toHaveProperty('item_id');
            expect(result).toHaveProperty('name');
        });
        
        it('should throw an Error on db query error', async () => {
            jest.spyOn(db, 'query').mockRejectedValue(new Error('Unable to locate post'));
        
            try {
                await Post.create({ name: "plum" });
            } catch (error) {
                expect(error).toBeTruthy();
                expect(error.message).toBe('Unable to locate post');
            }
        });
    });

    describe('updatePost', () => {
        it('should update a post successfully', async () => {
            // Create a new post
            const postData = {
                user_id: 1,
                title: "t1",
                content: 'u1',
                dueDate: '2024-01-01',
                subject: 'd1',
                generalXp: 1,
                subjectXp: 1,
                completed: false,
                repeatable: false,
            };
            const newPost = await Post.create(postData);
    
            // Update the post
            const updatedData = {
                title: "Updated Title",
                content: "Updated Content",
            };
    
            const updatedPost = await Post.updatePost(updatedData, newPost.item_id);
    
            expect(updatedPost.title).toBe(updatedData.title);
            expect(updatedPost.content).toBe(updatedData.content);
            expect(updatedPost.item_id).toBe(newPost.item_id);
        });
    
        it('should throw an error when trying to update a non-existent post', async () => {
            try {
                const updatedData = {
                    title: "Updated Title",
                    content: "Updated Content",
                };
                await Post.updatePost(updatedData, -1); // Assuming -1 is an invalid item_id
            } catch (error) {
                expect(error).toBeTruthy();
                expect(error.message).toBe("Unable to locate post");
            }
        });
    });
    
    describe('destroy', () => {
        it('should delete a post successfully', async () => {
            // Create a new post
            const postData = {
                user_id: 1,
                title: "t1",
                content: 'u1',
                dueDate: '2024-01-01',
                subject: 'd1',
                generalXp: 1,
                subjectXp: 1,
                completed: false,
                repeatable: false,
            };
            const newPost = await Post.create(postData);
    
            // Delete the post
            const deletedPost = await Post.destroy(newPost.item_id);
    
            expect(deletedPost).toBeInstanceOf(Post);
            expect(deletedPost.item_id).toBe(newPost.item_id);
        });
    
        it('should throw an error when trying to delete a non-existent post', async () => {
            try {
                await Post.destroy(-1);
            } catch (error) {
                expect(error).toBeTruthy();
                expect(error.message).toBe('Unable to locate post');
            }
        });
    });
})


