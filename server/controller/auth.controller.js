const jwt = require('jsonwebtoken')

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

const generateAccessToken = (email) =>
    jwt.sign({ email }, accessTokenSecret, { expiresIn: '30m' })
const generateRefreshToken = (email) => jwt.sign(email, refreshTokenSecret)

const handleRefreshToken = (req, res) => {
    const token = req.body.token;
    if (token) {
        jwt.verify(token, refreshTokenSecret, (err, email) => {
            if (err) return res.sendStatus(403)
            const accessToken = generateAccessToken(email)
            res.json({ accessToken })
        });
    } else {
        res.sendStatus(401)
    }
}

module.exports = { handleRefreshToken, generateAccessToken, generateRefreshToken }