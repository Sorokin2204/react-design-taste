const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenSevice = require('./token-service');
const UserDto = require('../dtos/user-dto');
class UserService {
  async signUp(email, password) {
    try {
      const currentUser = await UserModel.findOne({ email });
      if (currentUser) {
        throw new Error('Такой пользователь уже существует');
      }
      const activeLink = uuid.v4();
      const hashPasword = await bcrypt.hash(password, 3);
      const user = await UserModel.create({
        email,
        password: hashPasword,
        activeLink,
      });
      await mailService.sendActivationMail(email,  `${process.env.API_URL}/api/activate/${activeLink}`);

      const userDto = new UserDto(user);
      const tokens = tokenSevice.generateTokens({ ...userDto });

      await tokenSevice.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      };
    } catch (error) {
      console.log('[ERR] - ' + error);
    }
  }

  async activate(activeLink) {
    const user = await UserModel.findOne({ activeLink });
    if (!user) {
      throw new Error('Неккоректная ссылка');
    }

    user.isActivated = true;
    await user.save();
  }
}
module.exports = new UserService();