import {Mail} from "./Mail";

export class MailBox {
    constructor(
        public id: number,
        public email: string,
        public mails:Mail[] = []
    ) {
    }
}
