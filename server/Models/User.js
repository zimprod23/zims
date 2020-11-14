const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("config").get("jwtSECRET");
const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    maxlength: 50,
    trim: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    maxlength: 50,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  },
  isValidUser: {
    type: Number,
    default: 0,
  },
  role: {
    type: Number,
    required: true,
    default: 0,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  saved: {
    type: Array,
    default: [],
  },
  // saved: {
  //   type: Array,
  //   default: [],
  // },
});

//Defining Methods

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});
/*
UserSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const docToUpdate = await this.model.findOne(this.getQuery());
    console.log(docToUpdate);
    console.log(this.getQuery());
    return next();
  } catch (err) {
    return next(err);
  }
});
*/
UserSchema.methods.comparePassword = function (ReqPass, cb) {
  bcrypt.compare(ReqPass, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.showSomthing = function (tk, cb) {
  const beta = {
    sounds: tk,
    name: this.name,
    secret: secret,
  };
  cb(null, beta);
};

UserSchema.methods.generateToken = function (cb) {
  const token = jwt.sign(
    {
      name: this.name,
      email: this.email,
      lastname: this.lastname,
      id: this._id,
    },
    secret,
    {
      expiresIn: "4h",
    },
    (err, token) => {
      if (err) return cb(err);
      return cb(null, token);
    }
  );
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
