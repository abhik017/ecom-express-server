import express = require("express");
declare type RoutesFunction = (app: express.Express) => void;
export declare class Server {
    private static httpServer;
    private routes;
    private static readonly HTTP_PORT;
    private static readonly dbUrl;
    private corsOption;
    constructor(routes: RoutesFunction);
    private initializeServer;
    launchServer(): Promise<void>;
    closeServer(): Promise<void>;
}
export {};
