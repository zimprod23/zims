const mongoose = require("mongoose");

const ProductCemeterySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 100,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    picture: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    dimentions: {
      type: String,
      required: true,
    },
    categorie: {
      type: String,
      default: "All",
    },
    keywords: {
      type: Array,
      default: [],
      maxlength: 5,
    },
  },
  { timestamps: true }
);

const ProductCemetery = mongoose.model(
  "ProductCametery",
  ProductCemeterySchema
);
module.exports = { ProductCemetery };
