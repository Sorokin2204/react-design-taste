const ApiError = require("../exceptions/api-error");
const UserModel = require("../models/user-model");
const BriefModel = require("../models/brief-model");
const PassingBriefModel = require("../models/passingBrief-model");

class BriefService {
  async getBriefs(userId) {
    // const brief = await BriefModel.findOne({ title: "New brief" });
    const brief2 = await BriefModel.findOne({ title: "New brief 1" });
    // const user1 = await UserModel.findOne({
    //   email: "daniil.sorokin.228888@gmail.com",
    // });
    // const user2 = await UserModel.findOne({
    //   email: "daniil.sorokin.22888@gmail.com",
    // });
    const user3 = await UserModel.findOne({
      email: "daniil.sorokin.2288@gmail.com",
    });
    //
    // const newPassing = new PassingBriefModel({
    //   User: user1._id,
    //   Brief: brief._id,
    // });
    // const newPassing2 = new PassingBriefModel({
    //   User: user2._id,
    //   Brief: brief._id,
    // });
    const newPassing3 = new PassingBriefModel({
      User: user3._id,
      Brief: brief2._id,
    });
    //
    // await newPassing.save();
    // await newPassing2.save();
    await newPassing3.save();

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

  async passedBrief(briefId) {
    const existBrief = await BriefModel.findById(briefId);
    if (!existBrief) {
      throw ApiError.BadRequest("Такого брифа не существует");
    }

    const existsPassing = await PassingBriefModel.find({
      Brief: existBrief._id,
    }).select("-_id User");

    if (existsPassing.length == 0) {
      throw ApiError.BadRequest("Результатов по этому брифу не найдено");
    }

    const passedUsersIds = existsPassing.map((el) => el.User);

    const passedUsers = await UserModel.find({
      _id: { $in: passedUsersIds },
    }).select("email");

    return passedUsers;
  }
  async deleteBrief(req, res, next) {}
}

module.exports = new BriefService();
