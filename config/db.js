require("dotenv").config();
const mongoose = require("mongoose");
const connectedDB = async () => {
  const URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connectedDB;
