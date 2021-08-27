import request from 'supertest'
import {SimpleMailServer} from "./SimpleMailServer";

describe('simple mail server', () => {
    test('send a mail with success', async () => {
        const mailServer = new SimpleMailServer();
        await mailServer.start();

        await request('http://localhost:80').post('/sendMail')
            .expect(200)

        await mailServer.stop();

    });
});
