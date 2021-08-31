import http from "http";
import express, {json, Request, Response} from "express";

export class SimpleMailServer {
    private server?: http.Server;

    start() {
        const app = express();
        app.use(json());
        app.post('/mails/send', this.sendMail());
        app.get('/users', this.usersList());

        return new Promise((resolve) => {
            this.server = app?.listen(80, () => {
                resolve(0);
            });
        });

    }

    private sendMail() {
        return (req:Request, res:Response) => {
            res.sendStatus(200);
        };
    }

    private usersList() {
        return (req:Request, res:Response) => {
            res
                .send({
                    users: [
                        {id: 1, email: 'douglas.hofstadter@easymail.com'},
                        {id: 2, email: 'billy.thekid@easymail.com'},
                        {id: 3, email: 'magic.jordan@easymail.com'},
                    ]
                })
                .sendStatus(200);
        };
    }

    async stop() {
        return await new Promise((resolve) => {
            this.server?.close(resolve)
        });
    }
}
