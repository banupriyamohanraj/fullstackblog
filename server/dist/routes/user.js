"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const authorize_1 = __importDefault(require("../middleware/authorize"));
const router = express_1.default.Router();
router.post('/register', user_1.default.createUser);
router.get('/readall', authorize_1.default, user_1.default.readAll);
router.get('/readuser/:id', authorize_1.default, user_1.default.readUser);
router.post('/login', user_1.default.LoginUser);
module.exports = router;
//# sourceMappingURL=user.js.map