const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

module.exports = async () => {
  console.log("Boot script - Starting initdb");
  console.log("Boot script - initialising db config....");
  console.log(URI);

  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log("DB error: ", err.toString());
    throw err;
  }

  console.log("DB connected successfully!");
  return;
};
