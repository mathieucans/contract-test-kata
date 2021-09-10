import http from "http";
import express, {json} from "express";

export class LocalHttpServer {
    private server: http.Server

    private app = express()

    constructor() {
        this.app.use(json());
    }

    configureGet(url: string, responseBody: any) {
        this.app.get(url, (req, res) => {
            res.send(responseBody)
        });
    }

    async start(port: number) {
        return new Promise(resolve => {
                this.server = this.app.listen(port, () => resolve(0))
            }
        );
    }

    async stop() {
        return new Promise(resolve => {
            this.server.close(() => resolve(0))
        })
    }
}
