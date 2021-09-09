import {SimpleMail} from "./simpleMailApi";

export class SimpleMailInMemory implements SimpleMail {
    public inbox: Array<any> = [{
        from:'somone@simplemail.com',
        to: this.email,
        subject: 'a subject',
        body:'a body'
    }];
    constructor(
        private email:string
    ) {
    }

    async retrieveMail(): Promise<any> {
        return this.inbox
    }

    async sendMail(to: string, subject: string, body: string): Promise<any> {
        if (to === this.email){
            this.inbox.push(            {
                from: this.email,
                to: to,
                subject: subject,
                body: body
            })
        }
        return true;
    }

}
