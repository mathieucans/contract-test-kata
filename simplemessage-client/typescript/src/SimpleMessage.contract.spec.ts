// interact with server
// http://localhost:8080/:userId/messages
// and user id 1

import {SimpleMessage, SimpleMessageSdk} from "./SimpleMessageSdk";
import {Message} from "./Message";
import {SimpleMessageInMemory} from "./SimpleMessageInMemory";

function checkContract(name:string, simpleMessageFactory: () => SimpleMessage) {
    describe(name,  () => {
        let simpleMessageSdk: SimpleMessage;

        beforeEach(() => {
            simpleMessageSdk = simpleMessageFactory();
        });

        test('list received messages', async () => {
            let messages = await simpleMessageSdk.listMessage();
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
            const to = 'douglas.hofstadter';
            await simpleMessageSdk.sendMessage(to, expectedMessage);

            const messages = await simpleMessageSdk.listMessage()

            expect(messages[0].message).toEqual(expectedMessage);
        });
    });
}

describe('Simple message api contract tests', () => {
    checkContract('sdk', () => new SimpleMessageSdk());
    checkContract('in memory', () => new SimpleMessageInMemory([
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
    ], 'douglas.hofstadter'));
});

