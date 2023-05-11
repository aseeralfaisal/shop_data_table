require('dotenv').config()
const bcrypt = require("bcrypt")
const user = require('../model/user.model')
const auth = require('./auth.controller')

const saltRounds = process.env.SALT_ROUND
const validateData = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password should be at least 8 characters long' });
    }
}

const createUser = async (req, res) => {
    try {
        const { email, name, password, created_by } = req.body
        validateData(email, password)
        const userExists = await user.findOne({ email })
        if (userExists) {
            return res.status(409).json({ message: 'User already exist' })
        }
        const salt = await bcrypt.genSalt(+saltRounds)
        const hashPass = await bcrypt.hash(password, salt)
        console.log({ name })
        const createUser = await user.create({
            email,
            name,
            password: hashPass,
            created_by
        })
        res.json(createUser)
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        validateData(email, password)
        const userFound = await user.findOne({ email })
        if (userFound) {
            const compare = await bcrypt.compare(password, userFound.password)
            if (!compare) res.json({ message: 'Wrong email or password' })
        } else {
            res.json({ message: 'User Doesn\'t Exist' })
        }
        const accessToken = auth.generateAccessToken(email)
        const refreshToken = auth.generateRefreshToken(email)
        return res.status(200).json({ accessToken, refreshToken, username: userFound.name })
    } catch (error) {
        console.log(error)
    }
}

const getUsers = async (req, res) => {
    const users = await user.find()
    res.json(users)
}

const deleteUser = async (req, res) => {
    const { name } = req.body
    const userFound = await user.findOne({ name })
    if (userFound) {
        userFound.deleteOne()
    }
    res.json(userFound)
}

module.exports = {
    createUser,
    loginUser,
    getUsers,
    deleteUser
}