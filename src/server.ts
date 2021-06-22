import express = require("express");
import cors = require("cors");
import helmet = require("helmet");
import http = require("http");
// import https = require("https");
import bodyParser = require("body-parser");
import mongoose from "mongoose";

type RoutesFunction = (app: express.Express) => void;

export class Server {
    private static httpServer: http.Server;
    // private static httpsServer: https.Server;
    private routes: RoutesFunction;
    private static readonly HTTP_PORT = 8080;
    private static readonly dbUrl = "mongodb+srv://abhik:qwerty123456@cluster0.hrszn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    // private static readonly HTTPS_PORT = 8081;
    private corsOption: cors.CorsOptions = {
        origin: false,
        methods: ["GET", "PUT", "POST", "PATCH", "HEAD", "DELETE"]
    };

    constructor(routes: RoutesFunction) {
        this.routes = routes;
    }

    private async initializeServer() {
        const app: express.Express = express();
        // created express app
        // Helmet can help protect your app from some well-known web vulnerabilities
        app.use(helmet());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(bodyParser.text());
        app.use(cors(this.corsOption));
        this.routes(app);
        // Initialized routes
        Server.httpServer = http.createServer(app);
        // Server.httpsServer = https.createServer(options, app);
        Server.httpServer.listen(Server.HTTP_PORT, () => console.log(`Server is running on port ${Server.HTTP_PORT}`));
        // Server.httpServer.listen(Server.HTTPS_PORT);

        mongoose.connect(Server.dbUrl,{useNewUrlParser:true, useUnifiedTopology:true})
        .then(() => console.log("MongoDB connected successfully"))
        .catch((err)=> console.log(err.message));

        mongoose.set('useFindAndModify',false);
    }

    public async launchServer() {
        await this.initializeServer();
    }

    public async closeServer() {
        if(Server.httpServer !== undefined) {
            Server.httpServer.close();
        }
        // if(Server.httpsServer !== undefined) {
        //     Server.httpsServer.close();
        // }
    }
}