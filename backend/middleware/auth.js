import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default async function auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedData = jwt.verify(token, process.env.JWT_SECERET)

        req.params = decodedData;
        // console.log(decodedData)
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).send({ error: "Unauthorized" });
    }
}

export  function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}