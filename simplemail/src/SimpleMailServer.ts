import http from "http";
import express, {json, Request, Response} from "express";
import {MailBox} from "./MailBox";

export class SimpleMailServer {
    private server?: http.Server;

    constructor(private mailBoxes = [
        new MailBox(1, 'douglas.hofstadter@simplemail.com'),
        new MailBox(2, 'billy.thekid@simplemail.com'),
        new MailBox(3, 'magic.jordan@simplemail.com')]) {

    }

    start() {
        const app = express();
        app.use(json());
        app.post('/:userid/mails/send', this.sendMail());
        app.get('/:userid/mails', this.listMails());
        app.get('/users', this.usersList());

        return new Promise((resolve) => {
            this.server = app?.listen(80, () => {
                resolve(0);
            });
        });

    }

    private listMails() {
        return (req: Request, res: Response) => {
            let userid = parseInt(req.params.userid);
            res.send({
                mails: this.findMailBox(userid)!.mails})
                .sendStatus(200);
        };
    }

    private sendMail() {
        return (req: Request, res: Response) => {
            let userid = parseInt(req.params.userid);
            if (!this.findMailBox(userid)) {
                res.sendStatus(404);
                return;
            }
            res.sendStatus(200);
        };
    }

    private findMailBox(userid: number) {
        return this.mailBoxes.find(mb => mb.id === userid);
    }

    private usersList() {
        return (req: Request, res: Response) => {
            res
                .send({
                    users: this.mailBoxes
                        .map((mailBox) => {
                            return {id: mailBox.id, email: mailBox.email}
                        })
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
