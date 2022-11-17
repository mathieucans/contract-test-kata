// interact with server
// http://localhost:8080/:userId/messages
// and user id 1

import request from "superagent";

async function listMessages() {
    const response = await request.get('http://localhost:8080/1/messages');
    let messages = response.body.messages;
    return messages;
}

describe('Simple message api contract tests', () => {
    test('list received messages', async () => {
        let messages = await listMessages();
        expect(messages.slice(-2)).toEqual([
            {
                "from": "douglas.hofstadter",
                "id": "2",
                "message": "Hello from contract test",
                "to": "douglas.hofstadter"
            },
            {
                "from": "someone",
                "id": "1",
                "message": "hello doug from LA!",
                "to": "douglas.hofstadter"
            }
        ]);
    });

    test('send a message', async () => {
        await request.post(`http://localhost:8080/1/messages/send`)
            .send({to: 'douglas.hofstadter', message: 'Hello from contract test'});
    });
});

