const ApiError = require("../exceptions/api-error");
const UserModel = require("../models/user-model");
const BriefModel = require("../models/brief-model");

class BriefService {
  async getBriefs(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw ApiError.BadRequest("Такого пользователя не существует");
    }
    const briefs = await BriefModel.find({ User: userId });
    if (briefs.length == 0) {
      throw ApiError.BadRequest("Брифов не найдено");
    }
    return briefs;
  }
  async getBrief(userId) {}
  async addBrief(title, userId) {
    const existBrief = await BriefModel.findOne({ title });
    const existUser = await UserModel.findById(userId);
    console.log(existBrief);
    if (!existUser) {
      throw ApiError.BadRequest("Такого пользователя несуществует");
    }
    if (existBrief) {
      throw ApiError.BadRequest("Бриф с таким названием уже существует");
    }

    const newBrief = new BriefModel({ title, User: userId });
    await newBrief.save();
    return newBrief;
  }
  async editBrief(req, res, next) {}
  async deleteBrief(req, res, next) {}
}

module.exports = new BriefService();
