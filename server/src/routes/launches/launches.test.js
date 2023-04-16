const request = require('supertest');
const app = require('../../app');
describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
        // expect(response.statusCode).toBe(200);
    })
});

describe('TEST POST /launches', () => {
    const completeLaunchData = {
        mission: 'RSA-7',
        rocket: 'ROSA 1801-D',
        target: 'Keplar-186 f',
        launchDate: 'January 4,2028'
    };
    const launchDataWithoutDate = {
        mission: 'RSA-7',
        rocket: 'ROSA 1801-D',
        target: 'Keplar-186 f',

    }
    const launchDataWithInvalidDate = {
        mission: 'RSA-7',
        rocket: 'ROSA 1801-D',
        target: 'Keplar-186 f',
        launchDate: 'ieri'
    }

    test('It should respond with 201 created success', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);
        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);
        expect(response.body).toMatchObject(launchDataWithoutDate)
    })
    test('It should  catch missing requried properties', async () => {

        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);
        // expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(
            {
                error: "Missing required launch properties!"
            }
        )
    })
    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);
        // expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(
            {
                error: "Invalid launch date!"
            }
        )
    })
})