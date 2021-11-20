const UserModel = require("../models/user-model");
const BriefService = require("../service/brief-service");
const ApiError = require("../exceptions/api-error");
const { validationResult } = require("express-validator");
class BriefController {
  async getBriefs(req, res, next) {
    try {
      const userId = req.params.id;
      console.log(req.params);
      const briefs = await BriefService.getBriefs(userId);
      return res.json(briefs);
    } catch (e) {
      next(e);
    }
  }
  async getBrief(req, res, next) {}
  async addBrief(req, res, next) {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        throw new ApiError.BadRequest("Название должно быть больше 4 символов");
      }
      const userId = req.params.id;
      const { title } = req.body;
      const newBrief = await BriefService.addBrief(title, userId);
      return res.json(newBrief);
    } catch (e) {
      next(e);
    }
  }
  async editBrief(req, res, next) {}
  async deleteBrief(req, res, next) {}
}

module.exports = new BriefController();
