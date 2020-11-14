const express = require("express");
const config = require("config");
const multer = require("multer");
const firebase = require("firebase");
require("firebase/firebase-storage");
const { Product } = require("../Models/Product");
const { FeedBack } = require("../Models/Feedback");
const auth = require("../Middleware/auth");
const { Payment } = require("../Models/Payment");
const moment = require("moment");
const route = express.Router();

//Multer Configuration
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/Product");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const PictureFilter = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const VideoFilter = (req, file, cb) => {
  if (file.mimetype == "video/mp4") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadPicture = multer({
  Storage: Storage,
  fileFilter: PictureFilter,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
}).array("pics", 6);

const uploadVideo = multer({
  Storage: Storage,
  fileFilter: VideoFilter,
  limits: {
    fileSize: 1024 * 1024 * 40,
  },
}).single("trailer");

/**
 * @route GET /product/getallproduct
 * @access public
 * @user *
 * @description get all product
 */
route.get("/getallproduct", (req, res, next) => {
  Product.find()
    .sort({ createdAt: -1 })
    .exec((err, product) => {
      res.status(200).json({
        Products: product,
      });
    });
});

/**
 * @route GET /product/productbycat
 * @access public
 * @user *
 * @description get product by categorie
 */
route.get("/productbycat", async (req, res, next) => {
  const { cat } = req.query;
  await Product.find({ categorie: cat })
    .sort({ createdAt: -1 })
    .exec((err, doc) => {
      if (err) {
        res.status(500).json({
          err,
        });
      } else {
        if (doc.length < 1) {
          res.status(200).json({
            Products: doc,
            isEmpty: true,
          });
        } else {
          res.status(200).json({
            Products: doc,
            isEmpty: false,
          });
        }
      }
    });
});

/**
 * @route GET /product/promote
 * @access private
 * @user root
 * @description make promotion
 */

route.patch("/promoteproduct", async (req, res, next) => {
  const { id } = req.query;
  const { promotion } = req.body;
  console.log(req.body);
  let oldPrice = 0;
  var newPrice;
  let reductionLevel = parseInt(promotion);
  if (!id) {
    res.status(400).json({
      success: false,
      RequestFaild: "Please fill the missing input",
    });
    return;
  }
  if (reductionLevel > 90) reductionLevel = 90;
  await Product.findOne({ _id: id }).exec((err, xdoc) => {
    if (err) {
      res.status(500).json({
        err,
      });
      return;
    }

    strictPrice = xdoc.strictPrice;
    newPrice = strictPrice - strictPrice * (reductionLevel / 100);
    reductionLevel = xdoc.reduction;
    // console.log(oldPrice + " :: " + newPrice + " ::: " + promotion);
    Product.findOneAndUpdate(
      { _id: id },
      { $set: { reduction: reductionLevel, price: newPrice } },
      { new: true }
    ).exec((err, doc) => {
      if (err) {
        res.status(500).json({
          err,
        });
      } else {
        res.status(200).json({
          productwithreduction: doc,
        });
      }
    });
  });
});

/**
 * @route POST /product/addproduct
 * @access  private
 * @user admin
 * @description Uploading a product to collection
 *
 */

route.post("/addproduct", (req, res, next) => {
  const {
    name,
    stock,
    picture,
    description,
    descOverview,
    dimentions,
    categorie,
    keywords,
    overview,
    reduction,
    originalPrice,
    strictPrice,
    brand,
  } = req.body;
  console.log(req.body);
  if (
    !name ||
    !picture ||
    !description ||
    !dimentions ||
    !categorie ||
    !originalPrice ||
    !strictPrice ||
    !brand
  ) {
    res.status(403).json({
      success: false,
      message: "Please fill the missing inputs !",
    });
    return;
  }
  const newProduct = new Product({
    name: name,
    reduction: parseInt(reduction),
    stock: parseInt(stock) ? parseInt(stock) : 10,
    picture: picture,
    description: description,
    descOverview: descOverview,
    dimentions: dimentions,
    categorie: categorie,
    keywords: keywords ? keywords : [],
    overview: overview,
    originalPrice: parseInt(originalPrice),
    strictPrice: parseInt(strictPrice),
    brand: brand,
  }).save((err, product) => {
    if (err) {
      res.status(500).json({
        success: false,
        err,
      });
      console.log(err);
      return;
    } else {
      res.status(200).json({
        product: product,
        success: true,
      });
    }
  });
});

/**
 * @route DELETE /product/killproduct
 * @access  private
 * @user admin
 * @description delete a product from colection
 */
route.delete("/killproduct", async (req, res, next) => {
  const { riproduct } = req.query;

  await Product.findOneAndDelete({ _id: riproduct }).exec((err, product) => {
    if (err) {
      res.status(500).json({
        success: false,
        err,
      });
    } else {
      res.status(200).json({
        product: product,
        success: true,
      });
    }
  });
});

/**
 * @route GET /product/productById
 * @access  public
 * @user *
 * @description get a specefic product
 */

route.get("/updaterating", async (req, res, next) => {
  const { productId } = req.query;
  let totalRating = 0;
  let rating = 0;
  let raters = 0;
  await FeedBack.find({ product: productId })
    .then((doc) => {
      doc.forEach((fdbk, index) => {
        totalRating += fdbk.rating;
        raters++;
      });
      rating = doc.length ? totalRating / doc.length : 0;
      Product.findOneAndUpdate(
        { _id: productId },
        { rating: rating, raters: raters },
        { new: true }
      ).exec((err, product) => {
        if (err) {
          res.status(500).json({
            success: false,
            err,
          });
        } else {
          res.status(200).json({
            product: product,
            success: true,
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err,
        message: "Server error",
      });
    });
});

route.get("/productById", (req, res, next) => {
  const { id } = req.query;
  var viewedArticles = [];
  viewedArticles = req.cookies.isSeenByAVisitor
    ? JSON.parse(req.cookies.isSeenByAVisitor)
    : [];
  if (viewedArticles.find((target) => target == id) == undefined) {
    Product.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } },
      { new: true }
    ).exec((err, pro) => {
      if (err) {
        res.status(500).json({
          success: false,
          err: err,
          message: "Server error",
        });
        return;
      }
      viewedArticles.push(id);
      res.cookie("isSeenByAVisitor", JSON.stringify(viewedArticles));
      res.status(200).json({
        success: true,
        product: pro,
      });
    });
  } else {
    Product.findOne({ _id: id }).exec((err, pro) => {
      if (err) {
        res.status(500).json({
          success: false,
          err: err,
          message: "Server error",
        });
        return;
      }
      res.cookie("isSeenByVisitor", true);
      res.status(200).json({
        success: true,
        product: pro,
      });
    });
  }
});

/**
 * @route GET /product/getTopHeadlines
 * @access public
 * @user *
 * @description getting trending && recommended product
 */
route.get("/getTopHeadlines", async (req, res, next) => {
  await Product.find({ isRecommendedByAoumy: 1 })
    .sort({ createdAt: -1 })
    .exec((err, products) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Server error",
        });
        return;
      } else {
        res.status(200).json({
          success: true,
          products: products,
          message: "Data fetched with success",
        });
      }
    });
});

/**
 * @route GET /product/searchproduct?term=//
 * @access public
 * @user *
 * @description Getting search product
 */
route.get("/searchproduct", async (req, res, next) => {
  const { term } = req.query;
  await Product.find({ $text: { $search: term } }).exec((err, doc) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        products: doc,
        message: "Data fetched with success",
      });
    }
  });
});

/**
 * @route GET /product/simularProduct?productId=//
 * @access public
 * @user *
 * @description Getting simular product after visualizing a specefic product
 */

route.get("/simularProduct", async (req, res, next) => {
  const { productId } = req.query;

  let tags = [];
  var cat;

  await Product.findById(productId).exec((err, product) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
      return;
    } else {
      tags = product.keywords;
      cat = product.categorie;
      // Product.find({$and : [{ categorie: cat },{$all : [{keywords : tags}]}]})
      Product.find({ categorie: cat })
        .sort({ createdAt: -1 })
        .exec((err, products) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: "Server error",
            });
            return;
          } else {
            res.status(200).json({
              success: true,
              products: products,
              message: "Product Fetched",
            });
          }
        });
    }
  });
});

route.post("/productfeedback", auth, async (req, res, next) => {
  const { rating, comment } = req.body;
  const { productId } = req.query;
  await FeedBack.findOne({ tester: req.user.id, product: productId })
    .then((feedb) => {
      if (!feedb) {
        const feedback = new FeedBack({
          rating: rating,
          comment: comment,
          product: productId,
          tester: req.user.id,
        });
        feedback.save((err, doc) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: "Cannot save the feedback",
            });
            return;
          }
          res.status(200).json({
            success: true,
            feedback: doc,
            message: "feedback saved with success",
          });
        });
      } else {
        FeedBack.findOneAndUpdate(
          { tester: req.user.id, product: productId },
          { rating: rating, comment: comment },
          { new: true }
        ).exec((err, doc) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: "Server error",
            });
            return;
          } else {
            res.status(200).json({
              success: true,
              feedback: doc,
              message: "FeedBack updated",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err,
        message: "Server error",
      });
    });
});

//Cookies test
route.get("/testy", (req, res, next) => {
  const { target } = req.query;
  var papa = [];
  papa = req.cookies.array1 ? JSON.parse(req.cookies.array1) : [];
  if (!papa.find((tr) => tr == target)) {
    papa.push(target);
    res.cookie("array1", JSON.stringify(papa));
    res.status(200).send("cookie regestred");
  } else {
    res.status(200).send(req.cookies.array1);
  }
});

/**
 * @route GET /api/product/weeklySales
 * @user admin
 * @desc ...
 */

route.get("/weeklySalles", async (req, res, next) => {
  await Payment.find({
    createdAt: {
      $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
    },
  })
    .sort({ createdAt: 1 })
    .exec((err, product) => {
      res.status(200).json({
        graph: product.map((pr) => {
          return {
            tm: pr.createdAt,
            info: pr,
            moment: moment(pr.createdAt).weekday(),
          };
        }),
      });
    });
});
/**
 * @route GET /api/product/weeklySales
 * @user admin
 * @desc ...
 */
route.get("/selledProducts", async (req, res, next) => {
  const { productId } = req.query;
  var d = new Date();
  d.setMonth(d.getMonth() - 1);
  await Payment.find({
    product: { $elemMatch: { id: productId } },
    createdAt: { $gte: d },
  })
    .sort({ createdAt: 1 })
    .exec((err, doc) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "server error",
        });
        return;
      }
      Product.findById(productId).exec((exerr, pro) => {
        if (exerr) {
          res.status(403).json({
            success: false,
            message: "server error",
          });
          return;
        }
        res.status(200).json({
          success: true,
          graph: doc.map((dc) => {
            return {
              info: dc,
              createdAt: dc.createdAt,
              moment: moment(dc.createdAt, "YYYY-MM-DD").format("D"),
            };
          }), //doc.product,
          buyer: doc.map((dc) => {
            return dc.user;
          }),
          product: pro,
        });
      });
    });
});
/**
 * var d = new Date();
d.setMonth(d.getMonth() - 1); //1 month ago
db.data.find({created:{$gte:d}});
 */
/**
 * @path PATCH /recommandProduct
 * @user admin
 * @description recommand /disrecommand a prod "To be shown in headlines"
 */
route.patch("/recommandProduct", async (req, res, next) => {
  const { productId } = req.query;
  let recommandation = 0;
  await Product.findOne({ _id: productId }).exec((err, doc) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
      return;
    }
    recommandation = doc.isRecommendedByAoumy;
    Product.findOneAndUpdate(
      { _id: productId },
      {
        isRecommendedByAoumy: recommandation == 1 ? 0 : 1,
      },
      { new: true }
    ).exec((err, doc) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "server error",
        });
        return;
      }
      res.status(200).json({
        doc: doc,
        state: doc.isRecommendedByAoumy,
      });
    });
  });
});
/**
 * @path PATCH /reduce
 * @user admin
 * @description recommand /disrecommand a prod "To be shown in headlines"
 */
route.patch("/reduce", async (req, res, next) => {
  const { productId } = req.query;
  await Product.findOneAndUpdate(
    { _id: productId },
    {
      reduction: req.body.reduction,
      price:
        req.body.reduction > 0
          ? price - price * (req.body.reduction / 100)
          : price,
    },
    { new: true }
  ).exec((err, doc) => {
    if (err) {
      res.status(403).json({
        success: false,
        message: "server error",
      });
      return;
    }
    res.status(200).json({
      doc: doc,
    });
  });
});

route.patch("/fillStockage", async (req, res, next) => {
  await Product.findOneAndUpdate(
    { _id: req.query.id },
    { stock: parseInt(req.body.newStock) + parseInt(req.body.oldStock) },
    { new: true }
  ).exec((err, doc) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
      return;
    }
    res.status(200).json({
      doc: doc,
    });
  });
});

route.get("/finishPayment", async (req, res, next) => {
  Payment.find({ status: "unfinished" }).exec((err, doc) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
      return;
    }
    res.status(200).json({
      message: "success",
      graph: doc,
    });
  });
});

route.patch("/finishOrder", async (req, res, next) => {
  await Payment.findOneAndUpdate(
    { _id: req.query.orderId },
    { status: "finished" },
    { new: true }
  ).exec((err, doc) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
      return;
    }
    res.status(200).json({
      message: "success",
      graph: doc,
    });
  });
});

route.get("/getFeedbacks", async (req, res, next) => {
  await FeedBack.find()
    .populate("tester product")
    .sort({ createdAt: -1 })
    .exec((err, doc) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "server error",
        });
        return;
      }
      res.status(200).json({
        message: "success",
        feedbacks: doc,
      });
    });
});
module.exports = route;
