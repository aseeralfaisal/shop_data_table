require('dotenv').config()
const bcrypt = require("bcrypt")
const user = require('../model/user.model')
const { validateData, generateAccessToken, generateRefreshToken } = require('./auth.controller')

const saltRounds = process.env.SALT_ROUND

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
            const compare = bcrypt.compare(password, userFound.password)
            if (!compare) res.json({ message: 'Wrong email or password' })
        } else {
            res.json({ message: 'User Doesn\'t Exist' })
        }
        const accessToken = generateAccessToken(email)
        const refreshToken = generateRefreshToken(email)
        return res.status(200).json({ accessToken, refreshToken, username: userFound.name })
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, newname, newemail } = req.body
        const userFound = await user.findOne({ name })
        if (!userFound) return res.json({ message: "User not found" })
        if (userFound) {
            userFound.name = newname
            userFound.email = newemail
            const save = await userFound.save()
            res.json(save)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
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
    updateUser,
    deleteUser
}