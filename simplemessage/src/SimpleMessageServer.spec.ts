import request from 'supertest'
import {MessageBox} from "./MessageBox";
import {Message} from "./Message";
import {SimpleMessageServer} from "./SimpleMessageServer";


const douglasMail = 'douglas.hofstadter';
const billsMail = 'billy.thekid';
const jordanMail = 'magic.jordan';
const douglasId = 1;
const billsId = 2;

describe('simple mail server', () => {
    const baseUrl = 'http://localhost:80';
    let mailServer: SimpleMessageServer;
    let mailBoxes: MessageBox[];
    let billsMailbox: MessageBox;
    let billsOriginalMessages: Message[];

    beforeEach(async () => {
        billsOriginalMessages = [
            new Message('a',douglasMail, billsMail, 'Hello from vienne'),
            new Message('b',jordanMail, billsMail, 'Hello from LA'),
        ];
        billsMailbox = new MessageBox(billsId, billsMail, billsOriginalMessages);
        mailBoxes = [
            new MessageBox(douglasId, douglasMail),
            billsMailbox,
            new MessageBox(3, jordanMail)];
        mailServer = new SimpleMessageServer(mailBoxes);
        await mailServer.start();
    });

    afterEach(async () => {
        await mailServer.stop();
    });

    test('list received mails of a user', async () => {
        let jsonBillsMessages = billsOriginalMessages.map(m => JSON.parse(JSON.stringify(m)));
        await request(baseUrl)
            .get(`/${billsId}/messages`)
            .expect(200, {
                messages: jsonBillsMessages
            });
    });

    test('send a mail to an existing user', async () => {
        let message = 'hi from unit tests';
        let body = 'Is there a red phase?';
        await request(baseUrl)
            .post(`/${douglasId}/messages/send`)
            .send({to: billsMail, message: message, body: body})
            .expect(200)

        expect(billsMailbox.messages[0]).toEqual(new Message('1',
        douglasMail, billsMail, message));
    });

    test('cannot send a mail with wrong user', async () => {
        await request(baseUrl)
            .post('/12354/messages/send')
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
