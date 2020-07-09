let mongo = require("mongoose");

let Schema = mongo.Schema;

let basketSchema = new Schema({
  user_id: { type: String, required: true },
  items: { type: Array, required: true, default: [] },
});
module.exports = mongo.model("BASKET", basketSchema);
