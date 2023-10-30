const db = require('../../../database/connect');
const Post = require('../../../models/Post');

describe('Post Model Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        it('resolves with items on success', async () => {
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

    //I might have to change it if generalXp becomes generalxp!!! etc
    describe('getPostsById', () => {
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

            const result = await Post.getPostsByUserId(2);
            expect(result).toBeInstanceOf(Post);
            expect(result.title).toBe('Title 2');
            expect(result.item_id).toBe(2);
        });

        it('should throw an Error on db query error', async () => {
            jest.spyOn(db, 'query').mockRejectedValue(new Error('Unable to locate post'))
      
            try {
              await Post.getPostsByUserId('red')
            } catch (error) {
              expect(error).toBeTruthy()
              expect(error.message).toBe('Unable to locate post')
            }
          })
    });
});

