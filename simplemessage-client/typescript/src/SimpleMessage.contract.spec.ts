// interact with server
// http://localhost:8080/:userId/messages
// and user id 1

import request from "superagent";
import {response} from "express";

describe('Simple message api contract tests', () => {
    test('list received messages', async () => {
        const response = await request.get('http://localhost:8080/1/messages');
        expect(response.body).toEqual({
            "messages": [
                {
                    "from": "someone",
                    "id": "1",
                    "message": "hello doug from LA!",
                    "to": "douglas.hofstadter"
                }
            ]
        });
    });

    test('send a message', async () => {
        const response = await request.post(`http://localhost:8080/1/messages/send`)
            .send({to: 'douglas.hofstadter', message: 'Hello from contract test'});

        expect(response.body).toEqual({});
    });
});

