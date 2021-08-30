import http from "http";
import express, {json} from "express";

export class SimpleMailServer {
    private server?: http.Server;

    start() {
        const app = express();
        app.use(json());
            app.post('/mails/send', (req, resp) => {
            resp.sendStatus(200);
        });

        return new Promise((resolve) => {
            this.server = app?.listen(80, () => {
                resolve(0);
            });
        });

    }

    async stop() {
        return await new Promise((resolve) => {
            this.server?.close(resolve)
        });
    }
}
