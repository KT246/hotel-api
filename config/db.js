require("dotenv").config();
const mongoose = require("mongoose");

const connectedDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected...!");
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};

module.exports = connectedDB;
