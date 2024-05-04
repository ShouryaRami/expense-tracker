let express = require('express')
let {createUser, findUsers, findUser, updateUser} = require('../Controllers/userController')
let router = express.Router()

router.post('/createUser', createUser)
router.get('/findUsers', findUsers)
router.get('/findUser', findUser)
router.put('/updateUser', updateUser)

module.exports = router