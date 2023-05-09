const jwt = require('jsonwebtoken')
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token === null || token === undefined) return res.sendStatus(401)
        const verify = jwt.verify(token, accessTokenSecret)
        next()
    } catch (error) {
        res.sendStatus(403)
    }

}

module.exports = authenticateToken