import jwt from 'jsonwebtoken';
import { response } from '../helper/response.js'

export const jwtAuthenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null)
        return res.status(400).send(response("Require authentication token", "REQUIRE_AUTHENTICATION_TOKEN", [], 400))
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, admin) => {
        if (err) return res.status(400).send(response("Authentication token invalid", "AUTHENTICATION_TOKEN_INVALID", [], 400))
        next()
    })
}