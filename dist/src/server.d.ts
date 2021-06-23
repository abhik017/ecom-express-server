import express = require("express");
declare type RoutesFunction = (app: express.Express) => void;
export declare class Server {
    private static httpServer;
    private routes;
    private HTTP_PORT;
    private dbUrl;
    private corsOption;
    constructor(routes: RoutesFunction, dbUrl: string, port?: number);
    private initializeServer;
    launchServer(): Promise<void>;
    closeServer(): Promise<void>;
}
export {};
