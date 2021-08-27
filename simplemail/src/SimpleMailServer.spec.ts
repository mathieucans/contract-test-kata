import http from 'http';
import express, {json} from 'express'
import request from 'supertest'

describe('simple mail server', () => {
    test('send a mail with success', async () => {
        const app = express();
        app.use(json());
        app.post('/sendMail', (req, resp) => {
            resp.send(200);
        });
        let server: http.Server | undefined = undefined;
        await new Promise((resolve) => {
            server = app?.listen(80, () => {
                resolve(0);
            });
        });

        await request(app).post('/sendMail')
            .expect(200)

        await new Promise((resolve) => {
            server?.close(resolve)
        });
    });
});
