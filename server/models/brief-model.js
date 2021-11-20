var { Schema, model } = require("mongoose");
var BriefSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  User: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = model("Brief", BriefSchema);
