// let { deleteTableData } = require("../../api/users/user.service.js");
let request = require(`supertest`);

let server;
describe('Login Integration Testing', () => {
    beforeEach(() => { server = require(`../../index`); })
    afterEach(() => { server.close(); });
    describe('Login Check with valid data', () => {
        it('Success', async () => {
            const res = await request(server)
                .post('/api/users/login')
                .send({
                    "email": "jin@indexnine.com",
                    "password": "admin@123"
                });
            expect(res.status).toBe(200);
        });
    });
    describe('Login check with invalid data', () => {
        it('Success', async () => {
            const res = await request(server)
                .post('/api/users/login')
                .send({
                    "email": "jin@indexnine.com",
                    "password": "admin@12"
                });
            expect(res.status).toBe(401);
        });
    });
});