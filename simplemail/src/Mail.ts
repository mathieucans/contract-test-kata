export class Mail {
    constructor(
        public readonly from: string,
        public readonly to: string,
        public readonly subject: string,
        public readonly body: string
    ) {
    }
}