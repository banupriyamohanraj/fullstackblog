"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const authorize = (req, res, next) => {
    try {
        const token = req.headers.authorization || "";
        const decode = jsonwebtoken_1.default.verify(token, config_1.config.jwt_secret.key);
        req.body.user = decode;
        // console.log(decode)
        // return res.status(200).json({message:"authorized"})
        next();
    }
    catch (error) {
        return res.status(500).json({ error, message: "Internal server error" });
    }
};
exports.default = authorize;
//# sourceMappingURL=authorize.js.map