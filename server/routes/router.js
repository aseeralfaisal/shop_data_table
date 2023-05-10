const express = require('express')
const user = require('../controller/user.controller')
const item = require('../controller/item.controller')
const admin = require('../controller/admin.controller')
const { authenticateToken, verfyAdmin } = require('../middleware/auth.middleware')
const router = express.Router()

router.post('/createuser', user.createUser)
router.post('/loginuser', user.loginUser)
router.post('/deleteuser', [verfyAdmin, authenticateToken], user.deleteUser)
router.post('/createadmin', admin.createAdmin)
router.post('/loginadmin', verfyAdmin, admin.loginAdmin)
router.get('/getusers', authenticateToken, user.getUsers)
router.get('/item', authenticateToken, item.getItem)
router.post('/deleteitem', [verfyAdmin, authenticateToken], item.deleteItem)
router.post('/createitem', [verfyAdmin, authenticateToken], item.createItem)

module.exports = router