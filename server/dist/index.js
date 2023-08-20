"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const user_1 = __importDefault(require("./routes/user"));
const router = (0, express_1.default)();
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    console.log('Mongo connected successfully.');
    StartServer();
})
    .catch((error) => console.log(error));
/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    // /** Log the request */
    // router.use((req, res, next) => {
    //     /** Log the req */
    //     console.log(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    //     res.on('finish', () => {
    //         /** Log the res */
    //         console.log(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    //     });
    //     next();
    // });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /** Routes */
    router.use('/user', user_1.default);
    // router.use('/books', bookRoutes);
    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');
        console.log(error);
        res.status(404).json({
            message: error.message
        });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => console.log(`Server is running on port ${config_1.config.server.port}`));
};
//# sourceMappingURL=index.js.map