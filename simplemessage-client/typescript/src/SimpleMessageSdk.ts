import request from "superagent";
import {Message} from "./Message";

export interface SimpleMessage {
    listMessage(): Promise<Message[]>;

    sendMessage(to: string, message: string): Promise<void>;
}

export class SimpleMessageSdk implements SimpleMessage {
    async listMessage(): Promise<Message[]> {
        const response = await request.get('http://localhost:8080/1/messages');
        return response.body.messages.map((m: any) => new Message(m.from, m.id, m.message, m.to));
    }

    async sendMessage(to: string, message: string) {
        await request.post(`http://localhost:8080/1/messages/send`)
            .send({to: to, message: message});
    }
}