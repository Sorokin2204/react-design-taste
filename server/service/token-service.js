const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

class TokenService { 
    generateTokens (payload) { 
const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
  expiresIn: '30d',
});

return {
  accessToken,
  refreshToken,
};
    }

    async saveToken (userId, refreshToken) {
        const tokenData = await tokenModel.findOne({User:userId})

        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({User: userId, refreshToken})

        return token
    }
}

module.exports = new TokenService();