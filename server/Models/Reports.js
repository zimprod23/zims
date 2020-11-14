const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportsSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      maxlength: 50,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Reports = mongoose.model("Reports", ReportsSchema);

module.exports = { Reports };
