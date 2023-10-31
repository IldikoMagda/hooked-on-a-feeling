const db = require('../../../database/connect');
const Post = require('../../../models/Post');

describe('Post Model Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    // Model - getAll
    describe('getAll', () => {
        it('resolves with posts on success', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [
                    {
                        item_id: 1,
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
                    },
                ],
            });

            const posts = await Post.getAll();

            expect(posts).toHaveLength(2);
            expect(posts[0]).toBeInstanceOf(Post);
        });
    });

    // Model - getPostsByUserId
    describe('getPostsByUserId', () => {
        it('resolves with a post on successful db query', async () => {
            const testPost = {
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
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [testPost] });

            const result = await Post.getPostsByUserId(1);
            expect(result).toBeInstanceOf(Post);
            expect(result.title).toBe('Title 2');
            expect(result.item_id).toBe(2);
        });

        it('rejects with an error on db query error', async () => {
            jest.spyOn(db, 'query').mockRejectedValue(new Error('This post does not exist!'));

            await expect(Post.getPostsByUserId('red')).rejects.toThrow('This post does not exist!');
        });
    });

    // Model - getPostsByItemId
    describe('getPostsByItemId', () => {
        it('resolves with a post on successful db query', async () => {
            const testPost = {
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
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [testPost] });

            const result = await Post.getPostsByItemId(2);
            expect(result).toBeInstanceOf(Post);
            expect(result.title).toBe('Title 2');
            expect(result.item_id).toBe(2);
        });

        it('rejects with an error on db query error', async () => {
            jest.spyOn(db, 'query').mockRejectedValue(new Error('This post does not exist!'));

            await expect(Post.getPostsByItemId('red')).rejects.toThrow('This post does not exist!');
        });
    });
    // Model - create
    describe('create', () => {
        it('resolves with post on successful db query', async () => {
            const postData = {
                user_id: 1,
                title: 't1',
                content: 'u1',
                dueDate: '2024-01-01',
                subject: 'd1',
                generalXp: 1,
                subjectXp: 1,
            };

            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{ ...postData, item_id: 1 }],
            });
            jest.spyOn(Post, 'getPostsByItemId').mockResolvedValueOnce(
                new Post({
                    user_id: 1,
                    title: 't1',
                    content: 'u1',
                    dueDate: '2024-01-01',
                    subject: 'd1',
                    generalXp: 1,
                    subjectXp: 1, 
            }))

            const result = await Post.create(postData)
            expect(result).toBeTruthy()
            expect(result).toBeInstanceOf(Post);
        });
        it('rejects with an error on db query error', async () => {

            try{
                await Post.create()
            }catch(error){
                expect(error).toBeTruthy
                expect(error.message).not.toBe('')
            }
        });
    });
    describe('update', () => {
    // Model - updatePost
        it('should update a post successfully', async () => {
            // Create a new post
            const postData = {
                user_id: 1,
                title: 't1',
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
                title: 'Updated Title',
                content: 'Updated Content',
                dueDate: '2025-01-01',
                subject: 'Updated Subject',
                generalXp: 2,
                subjectXp: 2,
                completed: true,
                repeatable: true,
            };
        
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{ ...postData, ...updatedData }],
            });
        
            const updatedPost = await Post.update(updatedData, newPost.item_id);
        
            expect(updatedPost).toBeDefined();
            expect(updatedPost).toBeInstanceOf(Post);
        });
        it('rejects with an error on db query error', async () => {
           try{
            const newPost = new Post({
                title: 'Updated Title',
                content: 'Updated Content',
                dueDate: '2025-01-01',
                subject: 'Updated Subject',
                generalXp: 2,
                subjectXp: 2,
                completed: true,
                repeatable: true,
            })
            await Post.update({random: 1})
           }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).not.toBe('')
           }
        });
});
    // Model - destroy
    describe('destroy', () => {
        it('should delete a post successfully', async () => {
            // Create a new post
            const Postentry = new Post({
                user_id: 1,
                title: 't1',
                content: 'u1',
                dueDate: '2024-01-01',
                subject: 'd1',
                generalXp: 1,
                subjectXp: 1,
                completed: false,
                repeatable: false,
            });
        
            // Delete the post
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [{ ...Postentry, item_id: Postentry.item_id }],
            });
        
            const deletedPost = await Post.destroy(Postentry.item_id);
        
            expect(deletedPost).toBeInstanceOf(Post);
            expect(deletedPost.user_id).toBe(1);
        });
        });
    });




