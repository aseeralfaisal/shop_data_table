const jwt = require('jsonwebtoken')

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token) {
            jwt.verify(token, accessTokenSecret)
            next()
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.sendStatus(401)
        }
        return res.sendStatus(403)
    }
}

const verfyAdmin = (req, res, next) => {
    try {
        const userRole = req.headers['x-user-role']
        if (userRole === 'admin') {
            next()
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { authenticateToken, verfyAdmin }