import request from 'supertest'
import {SimpleMailServer} from "./SimpleMailServer";

describe('simple mail server', () => {
    let mailServer: SimpleMailServer;
    beforeEach(async () => {
        mailServer = new SimpleMailServer();
        await mailServer.start();
    });

    afterEach(async () => {
        await mailServer.stop();
    });

    test('send a mail with success', async () => {
        await request('http://localhost:80').post('/1/mails/send')
            .expect(200)
    });

    test('cannot send a mail with wrong user', async () => {
        await request('http://localhost:80').post('/12354/mails/send')
            .expect(404)
    });

    test('list users', async () => {
        await request('http://localhost:80').get('/users')
            .expect(200, {
                users: [
                    {id:1, email:'douglas.hofstadter@easymail.com'},
                    {id:2, email:'billy.thekid@easymail.com'},
                    {id:3, email:'magic.jordan@easymail.com'},
                ]
            });
    });
});
