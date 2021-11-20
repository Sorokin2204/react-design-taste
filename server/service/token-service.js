const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ User: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ User: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return tokenData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return tokenData;
    } catch (e) {
      return null;
    }
  }
  async findRefreshToken(token) {
    try {
      const tokenData = await tokenModel.findOne({ token });
      return tokenData;
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService();
