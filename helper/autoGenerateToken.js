import Admin from '../models/admin.js'
import bcrypt from 'bcrypt'
import { logger } from '../helper/logger.js'
import jwt from 'jsonwebtoken'

const saltRounds = 10;

const autoGenerateToken = () => {
    try {
        bcrypt.hash('admin', saltRounds, async (err, hash) => {
            if (err)
                logger(`autoGenerateToken ${err}`)
            const admin = new Admin({
                username: 'dannguyen',
                password: hash,
                email: "dannguyen0801@gmail.com",
                status: true
            })
            const result = await Admin.create(admin);
            const accessToken = jwt.sign(result.toObject(), process.env.ACCESS_TOKEN_SECRET)
            console.log(accessToken)
        })
    } catch (error) {
        logger(`autoGenerateToken ${error}`)
    }
}

export default autoGenerateToken;