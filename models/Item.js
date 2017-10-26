const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String
  },
  category: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  available: {
    type: Boolean
  },
  image: {
    type: String
  },
  sides: [{
    type: Schema.Types.ObjectId,
    ref: "Side"
  }]
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
