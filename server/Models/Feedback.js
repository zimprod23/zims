const mongoose = require("mongoose");
const { Product } = require("./Product");
const Schema = mongoose.Schema;

const FeedBackSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      default: 5,
    },
    comment: {
      type: String,
      maxlength: 50,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    tester: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

FeedBackSchema.pre("save", async function (next) {
  let totalRating = 0;
  let rating = 0;
  let raters = 0;
  try {
    await FeedBack.find({ product: this.product }).exec((err, doc) => {
      if (err) {
        next(err);
      }
      if (doc.length === 0) {
        Product.findOneAndUpdate(
          { _id: this.product },
          { rating: this.rating, raters: 1 },
          { new: true }
        ).exec((err, product) => {
          if (err) {
            next(err);
          }
          console.log("It works from here");
          console.log(this);
          next();
        });
      } else {
        doc.forEach((fdbk, index) => {
          totalRating += fdbk.rating;
          raters++;
        });
        rating = doc.length ? totalRating / doc.length : 0;
        Product.findOneAndUpdate(
          { _id: this.product },
          { rating: rating, raters: raters },
          { new: true }
        ).exec((err, product) => {
          if (err) {
            next(err);
          }
          console.log(this);
          next();
        });
      }
    });
    //next();
  } catch (err) {
    next(err);
  }
});
FeedBackSchema.pre("findOneAndUpdate", async function (next) {
  let totalRating = 0;
  let rating = 0;
  let raters = 0;
  try {
    const feedBack = await this.model.findOne(this.getQuery());
    await FeedBack.find({ product: feedBack.product }).exec((err, doc) => {
      if (err) {
        next(err);
      }
      if (doc.length === 0) {
        Product.findOneAndUpdate(
          { _id: feedBack.product },
          { rating: feedBack.rating, raters: 1 },
          { new: true }
        ).exec((err, product) => {
          if (err) {
            next(err);
          }
          console.log("It works from here");
          next();
        });
      } else {
        doc.forEach((fdbk, index) => {
          totalRating += fdbk.rating;
          raters++;
        });
        rating = doc.length ? totalRating / doc.length : 0;
        Product.findOneAndUpdate(
          { _id: feedBack.product },
          { rating: rating, raters: raters },
          { new: true }
        ).exec((err, product) => {
          if (err) {
            next(err);
          }
          console.log("Succes from findOneAndUpdate");
          next();
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

const FeedBack = mongoose.model("FeedBack", FeedBackSchema);

module.exports = { FeedBack };
