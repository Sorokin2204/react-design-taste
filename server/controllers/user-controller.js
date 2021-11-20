const { compare } = require("bcrypt");
const { validationResult } = require("express-validator");
const userService = require("../service/user-service");
const ApiError = require("../exceptions/api-error");
const UserModel = require("../models/user-model");
class UserController {
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.signIn(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async singUp(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Не корркетные данные", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await userService.signUp(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refesh() {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();

      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activeLink = req.params.link;
      await userService.activate(activeLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
