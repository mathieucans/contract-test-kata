import {SimpleMail} from "./simpleMailApi";
import {SimpleMailInMemory} from "./SimpleMailInMemory";

describe('simple mail in memory', () => {
    let simpleMail: SimpleMail;

    beforeEach(() => {
        simpleMail = new SimpleMailInMemory( 'douglas.hofstadter@simplemail.com');
    });

    test('retrieve mails of a user', async () => {
        const mails = await simpleMail.retrieveMail();

        expect(mails.length).toBeGreaterThan(0);
    })

    test('send a mail', async () => {
        const result = await simpleMail.sendMail(
            'douglas.hofstadter@simplemail.com',
            'Hello',
            'does it works ?');

        const mails = await simpleMail.retrieveMail();

        expect(mails).toContainEqual({
            from:'douglas.hofstadter@simplemail.com',
            to: 'douglas.hofstadter@simplemail.com',
            subject:'Hello',
            body:'does it works ?'
        })

    });

});
