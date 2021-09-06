import request from 'superagent'

describe('Simple mail api', () => {
    test('retrieve mails of a user', async () => {

        const result = await request.get('http://localhost:8080/1/mails')
            .send()

        expect(result.status).toEqual(200);
        expect(result.body.mails.length).toBeGreaterThan( 0);
    });

    test('send a mail', async () => {
        const result = await request.post('http://localhost:8080/1/mails/send')
            .send({
                to: 'douglas.hofstadter@simplemail.com',
                subject: 'Hello',
                body: 'does it works ?'
            });

        expect(result.status).toEqual(200);
    });
});
