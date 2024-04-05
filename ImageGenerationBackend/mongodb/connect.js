const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.set("strict", true);

  mongoose
    .connect(url)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
