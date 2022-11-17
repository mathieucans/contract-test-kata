export class Message {
    constructor(
        public readonly from: string,
        public readonly id: string,
        public readonly message: string,
        public readonly to: string) {

    }

}