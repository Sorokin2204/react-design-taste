const { Router } = require("express");
const rootRouter = new Router();
const user = require("./user-router");
const brief = require("./brief-router");

rootRouter.use(user);
rootRouter.use("/brief", brief);

module.exports = rootRouter;
