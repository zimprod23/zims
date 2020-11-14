const mongoose = require("mongoose");
const { ProductCemetery } = require("./ProductCemetery");

const ProductSchema = mongoose.Schema(
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
    originalPrice: {
      type: Number,
      default: 70,
      required: true,
    },
    strictPrice: {
      type: Number,
      default: 120,
      required: true,
    },
    rating: {
      type: Number,
      default: 5,
    },
    descOverview: {
      type: String,
      default: "This product has no overview for the description",
    },
    brand: {
      type: String,
      default: "none",
    },

    reduction: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 10,
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
    isRecommendedByAoumy: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    trailer: {
      type: String,
    },
    raters: {
      type: Number,
      default: 0,
    },
    overview: {
      type: String,
      default:
        "https://lesterlost.com/wp-content/uploads/2018/01/lesterlost-travel-morocco-shopping-guide-babouches-marrakesh.jpg",
    },
  },
  { timestamps: true }
);

ProductSchema.index(
  {
    name: "text",
    description: "text",
    categorie: "text",
  },
  {
    weights: {
      name: 4,
      description: 1,
      categorie: 1,
    },
  }
);

ProductSchema.pre("findOneAndDelete", async function (next) {
  try {
    const killedProduct = await this.model.findOne(this.getQuery());
    console.log(killedProduct);
    const deadPro = new ProductCemetery({
      name: killedProduct.name,
      price: killedProduct.stock,
      picture: killedProduct.picture,
      sold: killedProduct.sold,
      stock: killedProduct.stock,
      description: killedProduct.description,
      dimentions: killedProduct.dimentions,
      categorie: killedProduct.categorie,
      keywords: killedProduct.keywords,
    });
    await deadPro.save((err, deadpr) => {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  } catch (err) {
    next(err);
  }
});
ProductSchema.pre("save", function (next) {
  var product = this;
  try {
    product.price =
      product.strictPrice - product.strictPrice * (product.reduction / 100);

    next();
  } catch (err) {
    next(err);
  }
});
/*
ProductSchema.post("findOneAndUpdate", async function (next) {
  try {
    const product = await this.model.findOne(this.getQuery());
    product.price =
      reduction > 0 ? product.price * (product.reduction / 100) : product.price;
    return next();
  } catch (err) {
    return next(err);
  }
});
*/
// ProductSchema.pre("findOneAndUpdate", async function (next) {
//   try {
//     const product = await this.model.findOne(this.getQuery());
//     product.rating =
//       product.notices.totalPersons > 0
//         ? product.notices.totalRating / product.notices.totalPersons
//         : 0;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product };
