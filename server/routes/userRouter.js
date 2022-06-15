const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')

router.post('/signIn', userCtrl.signIn)

router.post('/signUp', userCtrl.signUp)

module.exports = router