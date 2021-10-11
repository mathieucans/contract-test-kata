import http from "http";
import express, {json, Request, Response} from "express";
import {MessageBox} from "./MessageBox";
import {MessageFactory} from "./MessageFactory";

const douglasMail = 'douglas.hofstadter';

export class SimpleMessageServer {
    private server?: http.Server;

    constructor(private mailBoxes = [
        new MessageBox(1, douglasMail, [
            MessageFactory.create('someone', douglasMail, 'hello doug from LA!')
        ]),
        new MessageBox(2, 'billy.thekid'),
        new MessageBox(3, 'magic.jordan')]) {

    }

    start() {
        const app = express();
        app.use(json());
        app.post('/:userid/messages/send', this.sendMail());
        app.get('/:userid/messages', this.listMails());
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
                messages: mailBox!.messages})
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

            const recipient = this.mailBoxes.find(mb => mb.owner === req.body.to);
            recipient!.messages = [MessageFactory.create(senderMailBox.owner, req.body.to, req.body.message)]
                .concat(recipient!.messages);

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
                            return {id: mailBox.id, email: mailBox.owner}
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
