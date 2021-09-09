import http from "http";
import express, {json, Request, Response} from "express";
import {MailBox} from "./MailBox";
import {Mail} from "./Mail";

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
            let mailBox = this.findMailBox(userid);
            if (mailBox === undefined){
                res.sendStatus(404);
                return;
            }
            res.send({
                mails: mailBox!.mails})
                .sendStatus(200);
        };
    }

    private sendMail() {
        return (req: Request, res: Response) => {
            let userid = parseInt(req.params.userid);
            let senderMailBox = this.findMailBox(userid);
            if (!senderMailBox) {
                res.sendStatus(404);
                return;
            }

            const recipient = this.mailBoxes.find(mb => mb.email === req.body.to);
            recipient!.mails = [new Mail(senderMailBox.email, req.body.to, req.body.subject, req.body.body)]
                .concat(recipient!.mails);

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
