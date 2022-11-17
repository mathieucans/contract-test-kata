import {SimpleMessage} from "./SimpleMessageSdk";
import {Message} from "./Message";

export class SimpleMessageInMemory implements SimpleMessage {
    constructor(
        private inbox: Message[],
        private readonly owner: string
    ) {
    }


    async listMessage(): Promise<Message[]> {
        return this.inbox;
    }

    async sendMessage(to: string, message: string): Promise<void> {
        if (to === this.owner) {
            this.inbox.unshift(new Message(
                this.owner,
                `${this.inbox.length + 1}`,
                message,
                to
            ))
        }
    }
}