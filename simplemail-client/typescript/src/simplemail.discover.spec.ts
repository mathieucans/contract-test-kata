import request from 'superagent'

describe('Simple mail api', () => {
    test('retrieve mails of a user', async () => {

        const result = await request.get('http://localhost:8080/1/mails')
            .send()

        expect(result.status).toEqual(200);
        expect(result.body).toEqual({mails:[]});
    });
});
