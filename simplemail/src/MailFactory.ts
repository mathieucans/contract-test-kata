import {Mail} from "./Mail";

export class MailFactory {
    private static _nextMailId: number = 1;

    private static nextId(): number {
        return this._nextMailId++;
    }

    static create(from: string, to: string, subject: string, body: string) {
        return new Mail(
            `${this.nextId()}`,
            from,
            to,
            subject,
            body);
    }

}
