import {SimpleMailApi} from "./simpleMailApi";

const exampleOfMails =
    {
        mails: [
            {
                from: 'douglas.hofstadter@simplemail.com',
                to: 'douglas.hofstadter@simplemail.com',
                subject: 'Hello',
                body: 'does it works ?'
            },
            {
                from: 'douglas.hofstadter@simplemail.com',
                to: 'douglas.hofstadter@simplemail.com',
                subject: 'Hello',
                body: 'does it works ?'
            }
        ]
    }

import express from 'express'
import http from 'http'
describe('simple mail api', () => {

    let server : http.Server;
    beforeEach((done) => {
        const app = express();
        app.get('/1/mails', (req, res) => {
            res.send(exampleOfMails)
                .sendStatus(200)
        });
        server = app.listen(1234, done);
    });

    afterEach((done) => {
        server.close(done)
    });

    test('retrieve mails', async () => {
        const api = new SimpleMailApi('http://localhost:1234');

        const mails = await api.retrieveMail();

        expect(mails).toEqual([
            {
                from: 'douglas.hofstadter@simplemail.com',
                to: 'douglas.hofstadter@simplemail.com',
                subject: 'Hello',
                body: 'does it works ?'
            },
            {
                from: 'douglas.hofstadter@simplemail.com',
                to: 'douglas.hofstadter@simplemail.com',
                subject: 'Hello',
                body: 'does it works ?'
            }
        ]);
    });
});


