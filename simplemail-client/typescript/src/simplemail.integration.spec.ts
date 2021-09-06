import request from 'superagent'

class SimpleMailApi {
    private baseUrl = `http://localhost:8080`;
    private userId = `1`;

    async retrieveMail(): Promise<request.SuperAgentRequest> {
        return request.get(`${this.baseUrl}/${this.userId}/mails`)
            .send()
    }

    async sendMail(to: string, subject: string, body: string) {
        const result = await request.post('http://localhost:8080/1/mails/send')
            .send({
                to: to,
                subject: subject,
                body: body
            });
        return result;
    }

}


describe('Simple mail api integration tests', () => {
    let simpleMail: SimpleMailApi;
    beforeEach(() => {
        simpleMail = new SimpleMailApi();
    });

    test('retrieve mails of a user', async () => {
        const result = await simpleMail.retrieveMail();

        expect(result.body.mails.length).toBeGreaterThan(0);
    });

    test('send a mail', async () => {
        const result = await simpleMail.sendMail(
            'douglas.hofstadter@simplemail.com',
            'Hello',
            'does it works ?');

        expect(result.status).toEqual(200);
    });
});
