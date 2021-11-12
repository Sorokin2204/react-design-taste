const { compare } = require("bcrypt");
const userService = require("../service/user-service");

const {validationResult} = require('express-validator')

class UserController {
async signIn () {
    
}

async singUp (req,res,next) {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        
        throw new Error("Не корректные данные")
    }
    const {email,password} = req.body;
    const userData = await userService.signUp(email,password)
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.json(userData)
}

async logout () {

}

async refesh () {
    
}

async getUsers (req,res,next) {
try {
    res.json(['123','465'])
} catch (error) {
    
}
}

 
async activate (req,res,next) {
const activeLink = req.params.link;
await userService.activate(activeLink);
return res.redirect(process.env.CLIENT_URL)
}

}

module.exports = new UserController();
