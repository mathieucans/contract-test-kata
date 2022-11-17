import {SimpleMessage} from "./SimpleMessageSdk";
import {Message} from "./Message";

export class SimpleMessageInMemory implements SimpleMessage {
    listMessage(): Promise<Message[]> {
        return Promise.resolve([]);
    }

    sendMessage(to: string, message: string): Promise<void> {
        return Promise.resolve(undefined);
    }
}