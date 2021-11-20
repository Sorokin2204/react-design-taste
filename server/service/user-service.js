const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenSevice = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async signUp(email, password) {
    const currentUser = await UserModel.findOne({ email });
    if (currentUser) {
      throw ApiError.BadRequest("Такой пользователь уже существует");
    }
    const activeLink = uuid.v4();
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activeLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activeLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenSevice.generateTokens({ ...userDto });

    await tokenSevice.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activeLink) {
    const user = await UserModel.findOne({ activeLink });
    if (!user) {
      throw ApiError.BadRequest("Недействительная ссылка");
    }

    user.isActivated = true;
    await user.save();
  }

  async signIn(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователя с таким email не существует");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenSevice.generateTokens({ ...userDto });
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenSevice.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenSevice.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenSevice.findRefreshToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenSevice.generateTokens({ ...userDto });

    await tokenSevice().saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getUsers() {
    const users = await UserModel.find();
    return users;
  }
}
module.exports = new UserService();
