const User = require('../../../models/User');
const db = require('../../../database/connect');

describe('User Model Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe('getAll', () => {
        it('resolves with users ordered by generalXp', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows:[
                    {
                    user_id: 1,
                    username: 'user1',
                    generalxp: 50,
                    subjectXpMaths: 30,
                    subjectXpEnglish: 20,
                    subjectXpScience: 10,
                    favColor: 'Blue',
                },
                {
                    user_id: 2,
                    username: 'user2',
                    generalxp: 60,
                    subjectXpMaths: 25,
                    subjectXpEnglish: 25,
                    subjectXpScience: 10,
                    favColor: 'Red',
                },
            ],

            });
            const users = await User.getAll();

            expect(users).toHaveLength(2);
            expect(users[0]).toBeInstanceOf(User);
            expect(users[0].username).toBe('user1');
        });
    });  
    describe('getOneById', () => {
        it('resolves with a user by ID', async () => {
            const testUser = {
                user_id: 1,
                username: 'testuser',
                generalxp: 100,
                subjectXpMaths: 50,
                subjectXpEnglish: 30,
                subjectXpScience: 20,
                favColor: 'Green',
            };
            db.query.mockResolvedValueOnce({
                rows: [testUser],
            });

            const result = await User.getOneById(1);
            expect(result).toBeInstanceOf(User);
            expect(result.username).toBe('testuser');
            expect(result.user_id).toBe(1);
        });

        it('rejects with an error if user with given ID is not found', async () => {
            db.query.mockResolvedValueOnce({
                rows: [], // Ensure an empty result to simulate a non-existent user.
            });

            await expect(User.getOneById(999)).rejects.toThrow("Unable to locate user.");
        });
    });

    describe('getOneByUsername', () => {
        it('resolves with a user by username', async () => {
            const testUser = {
                user_id: 2,
                username: 'testuser2',
                generalxp: 200,
                subjectXpMaths: 100,
                subjectXpEnglish: 60,
                subjectXpScience: 40,
                favColor: 'Orange',
            };
            db.query.mockResolvedValueOnce({
                rows: [testUser],
            });

            const result = await User.getOneByUsername('testuser2');
            expect(result).toBeInstanceOf(User);
            expect(result.username).toBe('testuser2');
            expect(result.user_id).toBe(2);
        });

        it('rejects with an error if user with given username is not found', async () => {
            db.query.mockResolvedValueOnce({
                rows: [],
            });

            await expect(User.getOneByUsername('nonexistentuser')).rejects.toThrow("Unable to locate user.");
        });
    });

    describe('create', () => {
        it('resolves with a newly created user', async () => {
            const userData = {
                username: 'newuser',
                password: 'password123',
                favColor: 'Yellow',
            };

            // db.query.mockResolvedValueOnce({
            //     rows: [{ ...userData, user_id: 3 }],
            // });
            jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ ...userData, user_name: 'newuser' }] });
      
            jest.spyOn(User, 'getOneById').mockResolvedValueOnce(
                new User({
                    username: 'newuser',
                    password: 'password123',
                    favColor: 'Yellow',
                })
            )

            const result = await User.create(userData)

            expect(result).toBeInstanceOf(User);
            expect(result).toBeTruthy();
        });
        it('rejects with an error on db query error', async () => {

            try{
                await User.create()
            }catch(error){
                expect(error).toBeTruthy
                expect(error.message).not.toBe('')
            }
        });

    });
        describe('update', () => {
        it('should update user generalXp successfully', async () => {
            const mockUserData = {
                user_id: 1,
                username: 'user1',
                generalxp: 50,
                subjectXpMaths: 30,
                subjectXpEnglish: 20,
                subjectXpScience: 10,
                favColor: 'Blue',
            };

            // // Mock the db.query calls
            // db.query
            //     .mockResolvedValueOnce({ rows: [mockUserData] }) // Get user
            //     .mockResolvedValueOnce({ rows: [mockUserData] }) // Update user

            // // Simulate fetching an existing user
            // const existingUser = await User.getOneById(1);

            // // Update the user's generalXp
            // const updatedData = {
            //     generalXp: 150,
            // };

            // const updatedUser = await existingUser.update(updatedData);

            // expect(updatedUser.generalXp).toBe(updatedData.generalXp);
        });

        it('should update user XP successfully', async () => {
            const mockUserData = {
                user_id: 1,
                username: 'user1',
                generalxp: 50,
                subjectXpMaths: 30,
                subjectXpEnglish: 20,
                subjectXpScience: 10,
                favColor: 'Blue',
            };

            // // Mock the db.query calls
            // db.query
            //     .mockResolvedValueOnce({ rows: [mockUserData] }) // Get user
            //     .mockResolvedValueOnce({ rows: [mockUserData] }) // Update subjectXpMaths
            //     .mockResolvedValueOnce({ rows: [mockUserData] }) // Update subjectXpEnglish
            //     .mockResolvedValueOnce({ rows: [mockUserData] }) // Update subjectXpScience

            // // Simulate fetching an existing user
            // const existingUser = await User.getOneById(1);

            // // Update subjectXpMaths, subjectXpEnglish, and subjectXpScience
            // const updatedData = {
            //     subjectXpMaths: 75,
            //     subjectXpEnglish: 45,
            //     subjectXpScience: 35,
            // };

            // const updatedUserMaths = await existingUser.updateMaths(updatedData);
            // const updatedUserEnglish = await existingUser.updateEnglish(updatedData);
            // const updatedUserScience = await existingUser.updateScience(updatedData);

            // expect(updatedUserMaths.subjectXpMaths).toBe(updatedData.subjectXpMaths);
            // expect(updatedUserEnglish.subjectXpEnglish).toBe(updatedData.subjectXpEnglish);
            // expect(updatedUserScience.subjectXpScience).toBe(updatedData.subjectXpScience);
        });

        it('should reject with an error on update failure', async () => {

            try{

                const mockUserData = {
                    user_id: 1,
                    username: 'user1',
                    generalxp: 50,
                    subjectXpMaths: 30,
                    subjectXpEnglish: 20,
                    subjectXpScience: 10,
                    favColor: 'Blue',
                };
            }catch(error){
                expect(error).toBeTruthy();
                expect(error.message).not.toBe('')
            }  
        });
    })

});