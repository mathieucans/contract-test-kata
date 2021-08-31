import http from "http";
import express, {json, Request, Response} from "express";
import {MailBox} from "./MailBox";

export class SimpleMailServer {
    private server?: http.Server;

    constructor( private mailBoxes = [
        new MailBox(1, 'douglas.hofstadter@easymail.com'),
        new MailBox(2, 'billy.thekid@easymail.com'),
        new MailBox(3, 'magic.jordan@easymail.com')]){

    }

    start() {
        const app = express();
        app.use(json());
        app.post('/:userid/mails/send', this.sendMail());
        app.get('/users', this.usersList());

        return new Promise((resolve) => {
            this.server = app?.listen(80, () => {
                resolve(0);
            });
        });

    }

    private sendMail() {
        return (req: Request, res: Response) => {
            if (!this.mailBoxes.find( mb => mb.id === parseInt(req.params.userid))){
                res.sendStatus(404);
                return;
            }
            res.sendStatus(200);
        };
    }

    private usersList() {
        return (req: Request, res: Response) => {
            res
                .send({
                    users: this.mailBoxes
                        .map((mailBox) => { return {id: mailBox.id, email:mailBox.email}})
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
