const request = require('supertest');
const server = require('../index');

beforeAll(async () => {
    console.log('Jest starting!');
});

afterAll(() => {
    console.log('server closed!');
});

describe('Auth Routes Test', () => {
    test('Request invalid end-point /', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(400);
    });

    test('Request logout without cookie', async () => {
        const response = await request(server).get('/auth/logout');
        expect(response.status).toEqual(200);
    });

    test('Request get file before login', async () => {
        const response = await request(server).get('/file');
        expect(response.status).toEqual(401);
    });

    test('Request register', async () => {
        const response = await request(server).post('/auth/register').send({ username:'test', password:'test' });
        expect(response.status).toEqual(200);
    });

    test('Request login', async () => {
        const response = await request(server).post('/auth/login').send({ username:'test', password:'test' });
        expect(response.status).toEqual(200);
    });

    test('Request valid logout', async () => {
        const response = await request(server).get('/auth/logout');
        expect(response.status).toEqual(200);
    });
});

describe('Business Routes Test', () => {
    let cookie;
    beforeAll(async ()=>{
        const response = await request(server).post('/auth/login').send({ username:'test', password:'test' });
        cookie = response.headers['set-cookie'];
    });

    test('Request valid file list', async () => {
        const response = await request(server).get('/file').set('cookie',cookie);
        expect(response.status).toEqual(200);
    });

    test('Request post file with nothing', async () => {
        const response = await request(server).post('/file').set('cookie',cookie);
        expect(response.status).toEqual(400);
    });

    test('Request post valid file', async () => {
        const response = await request(server).post('/file').set('cookie',cookie).attach('file','__test__/example.png');
        expect(response.status).toEqual(200);
    });

    test('Request get non-existent file', async () => {
        const response = await request(server).get('/file/123').set('cookie',cookie);
        expect(response.status).toEqual(404);
    });

    test('Request get valid file', async () => {
        const response = await request(server).get('/file/123805_example.jpg').set('cookie',cookie);
        expect(response.status).toEqual(200);
    });
});