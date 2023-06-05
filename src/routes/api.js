const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware')

router.post('/UserRegistration', UserController.UserRegistration)
router.post('/UserLogin', UserController.UserLogin);
router.get('/UserProfileDetail', AuthVerifyMiddleware, UserController.UserProfileDetail)
router.post('/UserProfileUpdate', AuthVerifyMiddleware, UserController.UserProfileUpdate)
router.post('/UserPasswordUpdateWithLogin', AuthVerifyMiddleware, UserController.UserPasswordUpdateWithLogin)

module.exports = router;