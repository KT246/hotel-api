const mongoose = require("mongoose");
// require("dotenv").config();
const connectedDB = async () => {
  const URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(
      "mongodb+srv://root-api:fwftpmlmwklmfkewop3opkop@hotel-api.1rfqe.mongodb.net/?retryWrites=true&w=majority&appName=hotel-api"
    );
    console.log("Connected to MongoDB...q!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connectedDB;
