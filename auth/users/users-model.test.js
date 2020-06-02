const db = require('../../database/dbConfig');
const USERS = require('./users-model');

describe('users-model', function() {
    describe('test environment', function() {
        it('should use the test environment', function() {
            expect(process.env.DB_ENV).toBe('testing')
        });
    });
    beforeEach(async function() {
        await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
    });
    describe('add()', function() {
        it('adds user to db', async function() {
            const user = await USERS.add(
                {
                    user_name: 'username', 
                    password: 'password',
                    email: 'name@email.com'
                }
            );
            expect(user.user_name).toBe('username')
            expect(user.id).toBe(1)
            const users = await db('users')
            expect(users).toHaveLength(1);
            expect(users[0]).toEqual(expect.objectContaining({id: 1}));
        });
    });
    describe('findBy(user_name)', function() {
        it('returns user by user_name', async function() {
            await db.seed.run();
            const user = await USERS.findBy('blubsbunny')
            expect(user.user_name).toBe('blubsbunny')
            expect(user.id).toBe(1)
        });
    });
    describe('getUserById(id)', function() {
        it('returns user by user id', async function() {
            await db.seed.run();
            const user = await USERS.getUserById(3)
            expect(user.user_name).toBe('gustydad')
            expect(user.id).toBe(3)
        });
    });
    describe('findUsers()', function() {
        it('returns a list of all users and their id', async function() {
            await db.seed.run();
            const users = await USERS.findUsers();
            expect(users).toHaveLength(5);
        });
    });
    describe('getUserData()', function() {

        it('returns a user object will all uploaded data as properties', async function() {
            await db.seed.run()
            const data = await USERS.getUserData(3);
            expect(data).toEqual(expect.objectContaining({user_id: 3}))
            expect(data).toEqual(expect.objectContaining({
                reviews: expect.arrayContaining([
                    expect.objectContaining({name: "Reservoir Dogs"})
                ]) 
            }))
        })
    })
})