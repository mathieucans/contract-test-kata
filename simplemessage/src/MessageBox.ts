import {Message} from "./Message";

export class MessageBox {
    constructor(
        public id: number,
        public owner: string,
        public messages:Message[] = []
    ) {
    }
}
