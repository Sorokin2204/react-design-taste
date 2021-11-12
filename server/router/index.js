const { Router } = require("express")
const userController = require('../controllers/user-controller');
const router = new Router()
const { body }= require('express-validator');

router.post('/sign-up', body('email').isEmail(),
body('password').isLength({min: 6, max: 32 }) , userController.singUp)
router.post('/sign-in', userController.signIn)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refesh)
router.get('/users', userController.getUsers);

module.exports = router