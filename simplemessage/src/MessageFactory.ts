import {Message} from "./Message";

export class MessageFactory {
    private static _nextMailId: number = 1;

    private static nextId(): number {
        return this._nextMailId++;
    }

    static create(from: string, to: string, subject: string) {
        return new Message(
            `${this.nextId()}`,
            from,
            to,
            subject);
    }

}
