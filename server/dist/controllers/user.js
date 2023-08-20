"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const validationErr = (0, express_validator_1.validationResult)(req);
        if (!validationErr.isEmpty()) {
            return res.status(400).json({ message: "Error" });
        }
        const user = new user_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            username,
            email,
            password
        });
        yield user.save();
        return res.status(201).json({ user, message: "user successfully registered !!!" });
    }
    catch (error) {
        return res.status(500).json({ error, message: "Internal server error" });
    }
});
const LoginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const validationErr = (0, express_validator_1.validationResult)(req);
        if (!validationErr.isEmpty()) {
            return res.status(400).json({ message: "Error" });
        }
        const user = yield user_1.default.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        user.comparePassword(password, (err, isMatch) => __awaiter(void 0, void 0, void 0, function* () {
            if (err || !isMatch) {
                return res.status(400).json({ message: "Invalid Password" });
            }
            const jwtkey = config_1.config.jwt_secret.key;
            const token = yield jsonwebtoken_1.default.sign({ id: user._id }, jwtkey);
            return res.status(200).json({ user, message: "user successfully Logged in!!!", token });
        }));
    }
    catch (error) {
        return res.status(500).json({ error, message: "Internal server error" });
    }
});
const readAll = (req, res, next) => {
    return user_1.default.find()
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};
const readUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield user_1.default.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json({ user, message: "User found" });
    }
    catch (error) {
        return res.status(500).json({ error, message: "Internal server error" });
    }
});
exports.default = { createUser, readAll, LoginUser, readUser };
//# sourceMappingURL=user.js.map