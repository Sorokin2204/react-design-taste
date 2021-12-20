var { Schema, model } = require("mongoose");
var PassingBriefSchema = new Schema({
  Brief: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Brief",
  },
  User: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = model("PassingBrief", PassingBriefSchema);
