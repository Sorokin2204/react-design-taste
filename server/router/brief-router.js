const { Router } = require("express");
const briefController = require("../controllers/brief-controller");
const { body } = require("express-validator");
const router = new Router();

router.get("/all/:id", briefController.getBriefs);
router.get("/passed/:id", briefController.passedBrief);
router.get("/:id", briefController.getBrief);
router.post(
  "/add/:id",
  body("title").isLength({ min: 5 }),
  briefController.addBrief
);
router.put("/edit/:id", briefController.editBrief);
router.delete("/delete/:id", briefController.deleteBrief);

module.exports = router;
