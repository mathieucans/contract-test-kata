export class Message {
    constructor(
        public readonly id:string,
        public readonly from: string,
        public readonly to: string,
        public readonly message: string
    ) {
    }
}
