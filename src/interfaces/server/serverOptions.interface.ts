import { type Router } from "express";

export interface ServerOptions {
    port: number;
    routes: Router;
}
