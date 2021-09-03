import request from 'supertest'
import {SimpleMailServer} from "./SimpleMailServer";
import {MailBox} from "./MailBox";
import {Mail} from "./Mail";


const douglasMail = 'douglas.hofstadter@simplemail.com';
const billsMail = 'billy.thekid@simplemail.com';
const jordanMail = 'magic.jordan@simplemail.com';
const douglasId = 1;
const billsId = 2;

describe('simple mail server', () => {
    const baseUrl = 'http://localhost:80';
    let mailServer: SimpleMailServer;
    let mailBoxes: MailBox[];
    let billsMailbox: MailBox;
    let billsOriginalMessages: Mail[];

    beforeEach(async () => {
        billsOriginalMessages = [
            new Mail(douglasMail, billsMail, 'Hello from vienne', 'Hi bill, how are you?'),
            new Mail(jordanMail, billsMail, 'Hello from LA', 'Hi bill, how are you?'),
        ];
        billsMailbox = new MailBox(billsId, billsMail, billsOriginalMessages);
        mailBoxes = [
            new MailBox(douglasId, douglasMail),
            billsMailbox,
            new MailBox(3, jordanMail)];
        mailServer = new SimpleMailServer(mailBoxes);
        await mailServer.start();
    });

    afterEach(async () => {
        await mailServer.stop();
    });

    test('list received mails of a user', async () => {
        let jsonBillsMessages = billsOriginalMessages.map(m => JSON.parse(JSON.stringify(m)));
        await request(baseUrl)
            .get(`/${billsId}/mails`)
            .expect(200, {
                mails: jsonBillsMessages
            });
    });

    test('send a mail to an existing user', async () => {
        let subject = 'hi from unit tests';
        let body = 'Is there a red phase?';
        await request(baseUrl)
            .post(`/${douglasId}/mails/send`)
            .send({to: billsMail, subject: subject, body: body})
            .expect(200)

        expect(billsMailbox.mails[0]).toEqual(new Mail(douglasMail, billsMail, subject, body));
    });

    test('cannot send a mail with wrong user', async () => {
        await request(baseUrl)
            .post('/12354/mails/send')
            .expect(404)
    });

    test('list users', async () => {
        await request(baseUrl).get('/users')
            .expect(200, {
                users: [
                    {id: douglasId, email: douglasMail},
                    {id: billsId, email: billsMail},
                    {id: 3, email: jordanMail},
                ]
            });
    });
});
