// interact with server
// http://localhost:8080/:userId/messages
// and user id 1

import request from "superagent";

export class Message {
    constructor(
        public readonly from: string,
        public readonly id: string,
        public readonly message: string,
        public readonly to: string) {

    }

}

async function listMessages() {
    const response = await request.get('http://localhost:8080/1/messages');
    let messages = response.body.messages.map((m: any) => new Message(m.from, m.id, m.message, m.to));
    return messages;
}

describe('Simple message api contract tests', () => {
    test('list received messages', async () => {
        let messages = await listMessages();
        expect(messages.slice(-2)).toEqual([
            new Message(
                "douglas.hofstadter",
                "2",
                "Hello from contract test",
                "douglas.hofstadter"
            ),
            new Message(
                "someone",
                "1",
                "hello doug from LA!",
                "douglas.hofstadter"
            )
        ]);
    });

    test('send a message', async () => {
        const expectedMessage = `Hello from contract test ${Date.now()}`;
        await request.post(`http://localhost:8080/1/messages/send`)
            .send({to: 'douglas.hofstadter', message: expectedMessage});

        const messages = await listMessages()

        expect(messages[0].message).toEqual(expectedMessage);
    });
});

