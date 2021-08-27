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
        await request('http://localhost:80').post('/sendmail')
            .expect(200)

    });
});
