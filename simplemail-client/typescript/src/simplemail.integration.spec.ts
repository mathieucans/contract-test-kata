import {SimpleMailApi} from "./simpleMailApi";


describe('Simple mail api integration tests', () => {
    let simpleMail: SimpleMailApi;
    beforeEach(() => {
        simpleMail = new SimpleMailApi();
    });

    test('retrieve mails of a user', async () => {
        const mails = await simpleMail.retrieveMail();

        expect(mails.length).toBeGreaterThan(0);
    });

    test('send a mail', async () => {
        const result = await simpleMail.sendMail(
            'douglas.hofstadter@simplemail.com',
            'Hello',
            'does it works ?');

        expect(result.status).toEqual(200);

        const mails = await simpleMail.retrieveMail();

        expect(mails).toContainEqual({
            from:'douglas.hofstadter@simplemail.com',
            to: 'douglas.hofstadter@simplemail.com',
            subject:'Hello',
            body:'does it works ?'
        })

    });
});
