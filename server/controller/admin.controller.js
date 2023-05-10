require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const admin = require('../model/adminuser.model')
const auth = require('./auth.controller')

const saltRounds = process.env.SALT_ROUND

const createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body
        const salt = await bcrypt.genSalt(+saltRounds)
        const hashPass = await bcrypt.hash(password, salt)
        const createUser = await admin.create({
            email,
            name,
            password: hashPass
        })
        res.json(createUser)
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const userFound = await admin.findOne({ email })
        if (userFound) {
            const compare = await bcrypt.compare(password, userFound.password)
            if (!compare) res.json({ message: 'Wrong email or password' })
        } else {
            res.json({ message: 'User Doesn\'t Exist' })
        }
        const accessToken = auth.generateAccessToken(email)
        const refreshToken = auth.generateRefreshToken(email)
        res.json({ accessToken, refreshToken })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createUser,
    loginUser,
}