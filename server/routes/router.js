const express = require('express')
const user = require('../controller/user.controller')
const item = require('../controller/item.controller')
const admin = require('../controller/admin.controller')
const authenticateToken = require('../middleware/auth.middleware')
const router = express.Router()

router.post('/createuser', user.createUser)
router.post('/loginuser', user.loginUser)
router.post('/deleteuser', user.deleteUser)
router.post('/createadmin', admin.createAdmin)
router.post('/loginadmin', admin.loginAdmin)

router.get('/', authenticateToken, (_, res) => res.status(200).send('Hello World'))
router.get('/getusers', authenticateToken, user.getUsers)
router.get('/item', authenticateToken, item.getItem)
router.post('/createitem', item.createItem)

module.exports = router