import request from "superagent";

export interface SimpleMail {
    retrieveMail(): Promise<any>;
    sendMail(to: string, subject: string, body: string): Promise<any>;
}

export class SimpleMailApi implements SimpleMail {
    private userId = `1`;

    constructor(
        private baseUrl = `http://localhost:8080`
    ) {
    }

    async retrieveMail(): Promise<any> {
        const response = await request.get(`${this.baseUrl}/${this.userId}/mails`)
            .send();
        console.log(response.body)
        return response.body.mails
    }

    async sendMail(to: string, subject: string, body: string) {
        const result = await request.post('http://localhost:8080/1/mails/send')
            .send({
                to: to,
                subject: subject,
                body: body
            });
        return result;
    }

}
