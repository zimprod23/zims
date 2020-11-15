const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { Product } = require("../Models/Product");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("config");
const auth = require("../Middleware/auth");
const adminauth = require("../Middleware/adminauth");
const sendMessage = require("../Middleware/mailconfiguration");
const resetPassword = require("../Middleware/forgotPassword");
const moment = require("moment");
const async = require("async");
const { Payment } = require("../Models/Payment");
const StripeSecretKey = config.get("STRIPE_SECRET_KEY");
const stripe = require("stripe")(StripeSecretKey);
const { v4: uuid } = require("uuid");
const { sendEmailMarcketing } = require("../Middleware/emailMarcketing");
const { sendConfirmationPayment } = require("../Middleware/confirmPayment");
const { Reports } = require("../Models/Reports");
//Router setup
const route = express.Router();

//Auth route
/**
 * @route GET/user/auth
 * @desc get current/logged user and verify token if it exits
 * @access private
 */

route.get("/auth", auth, (req, res, next) => {
  User.findById({ _id: req.user.id })
    .select("-password")
    .then((user) => {
      return res.status(200).json({
        user: user,
        isAuth: true,
        isAdmin: user.role === 0 ? false : true,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        AuthMessage: "No user Authentificated",
        success: false,
      });
    });
});

//Login
/**
 * @route POST/user/login
 * @desc login user
 * @access public
 */

route.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      RequestFaild: "Please fill the missing input",
    });
    return;
  }
  User.findOne({ email })
    .select("-__v")
    .then((user) => {
      if (user && user.isValidUser === 1) {
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            res.status(500).json({
              ServerError: "Cannot handle your password",
            });
          }
          if (!isMatch) {
            return res.status(403).json({
              AuthMessage: "Please verify your password",
              success: false,
            });
          } else {
            user.generateToken((err, token) => {
              if (err) {
                res.status(500).json({
                  ServerError: "Cannot handle your password",
                });
              }
              res.status(200).json({
                success: true,
                AuthMessage: "user is Authentificated",
                user: user,
                token: token,
              });
            });
          }
        });
      } else {
        res.status(403).json({
          success: false,
          AuthMessage: "User does not exist, Please verify your informations",
        });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Login
/**
 * @route POST/user/login
 * @desc register user
 * @access public
 */
route.post("/register", (req, res, next) => {
  const { name, password, email, lastName, image } = req.body;
  if (!name || !lastName || !password || !email) {
    res.status(400).json({
      success: false,
      RequestFaild: "Please fill the missing input",
    });
    return;
  }
  const newuser = new User({
    name: name,
    lastname: lastName,
    email: email,
    password: password,
    avatar: image,
  });
  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400).json({
          success: false,
          AuthMessage: "User Already exist",
        });
        return;
      } else {
        newuser.save((err, doc) => {
          if (err) {
            res.status(500).json({
              ServerError: "Cannot save the user *_*",
            });
            console.log("Server Error");
            return;
          }
          doc.generateToken((errr, token) => {
            if (errr) {
              res.status(500).json({
                ServerError: "Cannot handle your password",
              });
            }
            const newUserdata = {
              email: doc.email,
              link: `http://localhost:3000/user/activateAccount?id=${doc._id}`,
            };
            sendMessage(newUserdata);
            res.status(200).json({
              success: true,
              AuthMessage: "user is Authentificated",
              /* user: doc,
              token: token,*/
            });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

route.patch("/AccountVerification", async (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.query.id },
    { isValidUser: 1 },
    { new: true }
  ).exec((err, user) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User account activated with success",
    });
  });
});

route.post("/PasswordReset", async (req, res, next) => {
  await User.findOne({ email: req.body.email }).exec((err, doc) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
      return;
    }
    console.log(req.body.email);
    if (!doc) {
      res.status(404).json({
        success: false,
        message: "server error",
      });
      return;
    }
    let data = {
      email: doc.email,
      link: `http://localhost:3000/user/PasswordReset?id=${doc._id}`,
    };
    resetPassword(data);
    res.status(200).json({
      success: true,
      user: doc,
    });
  });
});

route.post("/ChangePassword", async (req, res, next) => {
  const { userId, password } = req.body;
  if (!password) {
    res.status(500).json({
      success: false,
      message: "invalid password",
    });
  }
  await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return res.status(500).json({
          Message: "Cannot save the password",
        });
      } else {
        User.findOneAndUpdate(
          { _id: userId },
          { password: hash },
          { new: true }
        ).exec((exerr, user) => {
          if (exerr) {
            res.status(500).json({
              success: false,
              message: "server error",
            });
            return;
          }
          res.status(200).json({
            success: true,
            message: "password changed with success",
          });
        });
      }
    });
  });
});

route.patch("/suspendAccount", auth, async (req, res, next) => {
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { isValidUser: 0 },
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
      success: true,
      message: "Good Bye 😢",
    });
  });
});

route.patch("/changeStuffs", auth, (req, res, next) => {
  const { command, newname, newlastname, newemail, password } = req.body;
  if (command === "Change_email") {
    if (!newemail) {
      res.status(500).json({
        success: false,
        message: "Missing input",
      });
      return;
    }
    User.findOneAndUpdate(
      { _id: req.user.id },
      { email: newemail },
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
        success: true,
        message: "email changed",
      });
    });
  } else {
    if (command === "Change_name") {
      if (!newname || !newlastname) {
        res.status(500).json({
          success: false,
          message: "Missing input",
        });
        return;
      }
      User.findOneAndUpdate(
        { _id: req.user.id },
        { name: newname, lastname: newlastname },
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
          success: true,
          message: "name and lastname changed",
        });
      });
    } else {
      if (!password) {
        res.status(500).json({
          success: false,
          message: "Missing input",
        });
        return;
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            return res.status(500).json({
              Message: "Cannot save the password",
            });
          } else {
            User.findOneAndUpdate(
              { _id: req.user.id },
              { password: hash },
              { new: true }
            ).exec((exerr, user) => {
              if (exerr) {
                res.status(500).json({
                  success: false,
                  message: "server error",
                });
                return;
              }
              res.status(200).json({
                success: true,
                message: "password changed with success",
              });
            });
          }
        });
      });
    }
  }
});

/**
 * @route GET /api/user/addToCard
 * @access private
 * @user Auth users
 * @desc adding product to cards
 */

route.get("/addToCart", auth, (req, res) => {
  User.findOne({ _id: req.user.id }, (err, userInfo) => {
    let duplicate = false;

    console.log(userInfo);

    userInfo.cart.forEach((item) => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user.id, "cart.id": req.query.productId },
        { $inc: { "cart.$.quantity": req.query.command === "minus" ? -1 : 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json({ cart: userInfo.cart });
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: {
            cart: {
              id: req.query.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json({ cart: userInfo.cart });
        }
      );
    }
  });
});

route.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  console.log("req.query.id", req.query.id);

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = [];
    productIds = ids.map((item) => {
      return item;
    });
  }

  console.log("productIds", productIds);

  //we need to find the product information that belong to product Id
  Product.find({ _id: { $in: productIds } }).exec((err, product) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(product);
  });
});

route.get("/userCartInfo", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let cart = userInfo.cart;
    let array = cart.map((item) => {
      return item.id;
    });

    Product.find({ _id: { $in: array } }).exec((err, cartDetail) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, cartDetail, cart });
    });
  });
});

//LATER

route.post("/test", (req, res, next) => {
  User.findOneAndUpdate(
    { name: "Hamza" },
    { password: "HamzaLouhab" },
    { new: true }
  )
    .then((resu) => {
      res.status(200).json({
        user: resu,
      });
    })
    .catch((err) => {
      res.status(500).send("Noo");
    });
});

/**
 * @route get/user/allusers
 * @desc register user
 * @access private
 * @who admin
 */

route.get("/allusers", (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        users: users,
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Cannot load any data",
        success: false,
      });
    });
});

/**
 * @route GET /user/saveProduct
 * @desc save a Product
 * @access private
 * @user *
 */
route.get("/saveProduct", auth, (req, res, next) => {
  const { productId, save } = req.query;
  console.log(save);
  if (save == "save") {
    Product.findById(productId).exec((err, product) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "server error",
        });
        return;
      }
      User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: {
            saved: {
              productId: productId,
              name: product.name,
              price: product.price,
              rating: product.rating,
              overview: product.overview,
              descOverview: product.descOverview,
              reduction: product.reduction,
              date: Date.now(),
            },
          },
        },
        { new: true }
      ).exec((err, doc) => {
        if (err) {
          res.status(500).json({
            success: false,
            err: err,
            message: "Server error",
          });
          return;
        }
        res.status(200).json({
          // success: true,
          // product: doc,
          // message: "Product saved with success",
          productId: productId,
          date: Date.now(),
        });
      });
    });
  } else {
    User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { saved: { productId: productId } } },
      { new: true }
    ).exec((err, doc) => {
      if (err) {
        res.status(500).json({
          success: false,
          err: err,
          message: "Server error",
        });
        return;
      }
      res.status(200).json({
        // success: true,
        // product: doc,
        // message: "Product unsaved with success",
        productId: productId,
        date: Date.now(),
      });
    });
  }
});

route.get("/removeFromCart", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user.id },
    {
      $pull: { cart: { id: req.query._id } },
    },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map((item) => {
        return item.id;
      });

      Product.find({ _id: { $in: array } })
        .populate("writer")
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart,
          });
        });
    }
  );
});

route.post("/successBuy", auth, (req, res) => {
  let history = [];
  let transactionData = {};

  //1.Put brief Payment Information inside User Collection
  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.data.paymentID,
      overview: item.overview,
      picture: item.picture,
      originalPrice: item.originalPrice,
      //isRecommendedByAoumy: item.isRecommendedByAoumy,
    });
  });

  //2.Put Payment Information that come from Paypal into Payment Collection
  transactionData.user = {
    id: req.user.id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;
  let data = {
    orderId: req.body.paymentData.Coordinates.orderId,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
    history: history,
    total: req.body.paymentData.Coordinates.total,
  };
  transactionData.total = data.total;

  User.findOneAndUpdate(
    { _id: req.user.id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        //3. Increase the amount of number for the sold information

        //first We need to know how many product were sold in this transaction for
        // each of products

        data.pid = doc._id;
        let products = [];
        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        // first Item    quantity 2
        // second Item  quantity 3

        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.json({ success: false, err });
            sendConfirmationPayment(data);
            res.status(200).json({
              success: true,
              cart: [],
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});

route.get("/getHistory", auth, (req, res) => {
  User.findOne({ _id: req.user.id }, (err, doc) => {
    let history = doc.history;
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, history });
  });
});

//CARD PAYMENT GATEWAY

//Handle only one product
route.post("/checkout", async (req, res, next) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotency_key,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

// route.get("/userCartInfo", auth, (req, res) => {
//   User.findOne({ _id: req.user._id }, (err, userInfo) => {
//     let cart = userInfo.cart;
//     let array = cart.map((item) => {
//       return item.id;
//     });

//     Product.find({ _id: { $in: array } })
//       .populate("writer")
//       .exec((err, cartDetail) => {
//         if (err) return res.status(400).send(err);
//         return res.status(200).json({ success: true, cartDetail, cart });
//       });
//   });
// });

/**
 * @route get/user/deleteUser
 * @desc delete user
 * @access private
 * @who admin
 */
/*
route.delete("/deleteuSER", auth, adminauth, (req, res, next) => {
  const { userId } = req.query;
  User.findOneAndDelete({ _id: userId }).exec((err, doc) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: "Connot delete user",
      });
    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  });
});

route.patch("/changepass", auth, (req, res, next) => {
  const { newpass } = req.body;
  if (!newpass)
    return res.status(400).json({
      success: false,
      message: "Cannot update password",
    });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newpass, salt, (err, hash) => {
      if (err)
        return res.status(400).json({
          success: false,
          message: "Cannot update password",
        });

      User.findByIdAndUpdate(
        { _id: req.user.id },
        { password: hash },
        { new: true }
      ).exec((err, doc) => {
        if (err)
          return res.status(401).json({
            success: false,
            message: "Cannpt update password",
          });
        res.status(200).json({
          success: true,
          message: "password updated",
          doc,
        });
      });
    });
  });
});
*/
/**
 * @route get/user/deleteUser
 * @desc delete user
 * @access private
 * @who admin
 */
/*
route.post("/defenetlydeleteacc", auth, (req, res, next) => {
  const { pass } = req.body;
  User.findById(req.user.id)
    .then((user) => {
      user.comparePassword(pass, (err, isMatch) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: "server error",
          });
        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: "Password does not match",
          });
        }
        User.deleteOne({ _id: req.user.id }).exec((err, doc) => {
          if (err)
            return res.status(500).json({
              success: false,
              message: "server error",
            });
          res.status(200).json({
            success: true,
            message: "user deleted",
            doc,
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        message: "Ooops something went wrong",
      });
    });
});
*/

route.post("/sendEmail", async (req, res, next) => {
  const { email, images, subject, body, strategie } = req.body;
  if (strategie === "spEmail") {
    await User.findOne({ email: email }).exec((err, doc) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "server error",
        });
        return;
      }
      console.log(doc);
      console.log(req.body);
      let name = doc.name;
      let lastname = doc.lastname;
      let data = {
        images: images,
        index: true,
        subject: subject,
        body: body,
        name: name,
        lastname: lastname,
        email: email,
      };
      sendEmailMarcketing(data);
      res.status(200).json({
        message: "success",
      });
    });
  } else {
    let onelineEmails = "";
    await User.find({ isValidUser: 1 }).exec((err, doc) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "server error",
        });
        return;
      }
      doc.forEach((user, index) => {
        if (index < doc.length - 1) {
          onelineEmails += `${user.email},`;
        } else {
          onelineEmails += user.email;
        }
      });
      console.log(onelineEmails);
      let data = {
        images: images,
        index: false,
        subject: subject,
        body: body,
        email: onelineEmails,
      };
      sendEmailMarcketing(data);
      res.status(200).json({
        success: true,
      });
    });
  }
});

route.get("/getString", (req, res, next) => {
  let onlineEmails = "";
  User.find().exec((err, doc) => {
    doc.forEach((user, index) => {
      if (index < doc.length - 1) {
        onlineEmails += `${user.email},`;
      } else {
        onlineEmails += user.email;
      }
    });
    res.status(200).json({
      emails: doc.map((user) => {
        return user.email;
      }),
      str: onlineEmails,
    });
  });
});

route.get("/getSavedProducts", auth, async (req, res, next) => {
  const { id } = req.user;
  await User.findById(id).exec((err, doc) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "server error",
      });
      return;
    }
    res.status(200).json({
      success: true,
      user: doc,
      savedProducts: doc.saved,
    });
  });
});

route.post("/submitreport", auth, (req, res, next) => {
  const { comment } = req.body;
  const { id } = req.user;
  if (!comment) {
    res.status(405).json({
      success: false,
      message: "please fill the missing inputs",
    });
    return;
  }

  const report = new Reports({
    comment: comment,
    user: id,
  }).save((err, doc) => {
    if (err) {
      res.status(501).json({
        success: false,
        message: "server error",
      });
      return;
    }
    res.status(200).json({
      success: true,
      report: doc,
    });
  });
});

route.get("/getReport", async (req, res, next) => {
  await Reports.find()
    .populate("user")
    .sort({ createdAt: -1 })
    .exec((err, doc) => {
      if (err) {
        res.status(501).json({
          success: false,
          message: "server error",
        });
        return;
      }
      res.status(200).json({
        success: true,
        reports: doc,
      });
    });
});

route.delete("/dropReport", async (req, res, nex) => {
  await Reports.deleteOne({ _id: req.query.id }).exec((err, doc) => {
    if (err) {
      res.status(501).json({
        success: false,
        message: "server error",
      });
      return;
    }
    res.status(200).json({
      success: true,
      report: doc,
    });
  });
});

route.delete("/dropHistory", auth, async (req, res, next) => {
  await User.findByIdAndUpdate(
    { _id: req.user.id },
    { $set: { history: [] } },
    { new: true }
  ).exec((err, doc) => {
    if (err) {
      res.status(501).json({
        success: false,
        message: "server error",
      });
      return;
    }
    res.status(200).json({
      success: true,
      doc,
    });
  });
});
module.exports = route;
