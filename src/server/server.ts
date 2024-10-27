import express, { Router } from "express";
import { ServerOptions } from "../interfaces";

export class Server {
    public readonly app = express();
    private port: number;
    private routes: Router;

    constructor(options: ServerOptions) {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {
        //* Middleware
        this.app.use(express.json());

        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
