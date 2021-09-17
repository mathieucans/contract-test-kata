import {LocalHttpServer} from "./LocalHttpServer";

describe('SimpleMailApi', () => {
    let server: any;
    beforeEach(async () => {
        server = await new LocalHttpServer();
        await server.start(1234);
    });

    afterEach(async () => {
        await server.stop();
    });
});
