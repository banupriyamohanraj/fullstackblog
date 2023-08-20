import express from 'express';
import Controller from "../controllers/user"
import authorize from "../middleware/authorize"

const router = express.Router();

router.post('/register',  Controller.createUser);
router.get('/readall' ,authorize,Controller.readAll)
router.get('/readuser/:id',authorize, Controller.readUser)
router.post('/login',Controller.LoginUser)

export = router;