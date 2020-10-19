import Admin from '../models/admin.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { response } from '../helper/response.js'
import { logger } from '../helper/logger.js'

const login = (req, res) => {
    if (!req.body.username)
        return res.status(400).send(response('Username is required', "USERNAME_IS_REQUIRED", [], 400));
    const username = req.body.username;
    Admin.findOne({ username: username }, (error, admin) => {
        if (error) {
            logger(`loginAdmin ${error}`);
            return res.status(500).send(response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500));
        }
        if (!admin) return res.status(400).send(response('Admin not exist', 'ADMIN_NOT_EXIST', [], 500));
        //verify user
        bcrypt.compare(req.body.password, admin.password, (err, result) => {
            if (err) {
                logger(`loginAdmin ${err}`);
                return res.status(500).send(response('Internal error', 'INTERNAL_SERVER_ERROR', [], 500));
            }
            //if true, create token for user
            if (result) {
                const accessToken = jwt.sign(admin.toObject(), process.env.ACCESS_TOKEN_SECRET);
                return res.status(200).send(response("Login success", "LOGIN_SUCCESS", accessToken, 200));
            }
            else {
                return res.status(400).send(response("Wrong passwrod", "WRONG_PASSWORD", [], 400));
            }
        });
    })
}

export default login;