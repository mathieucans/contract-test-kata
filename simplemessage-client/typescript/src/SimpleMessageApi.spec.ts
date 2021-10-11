import {LocalHttpServer} from "./LocalHttpServer";
import {SimpleMessageSdk} from "./SimpleMessageSdk";

describe('SimpleMessageApi', () => {
    let server: any;
    let simpleMessageSdk: SimpleMessageSdk;
    beforeEach(async () => {
        server = await new LocalHttpServer();
        await server.start(1234);
        simpleMessageSdk = new SimpleMessageSdk('http://localhost:1234');
    });

    afterEach(async () => {
        await server.stop();
    });

    test('list received messages', async () => {

    });
});
