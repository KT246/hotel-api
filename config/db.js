const mongoose = require("mongoose");

const connectedDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://root-api:fwftpmlmwklmfkewop3opkop@hotel-api.1rfqe.mongodb.net/?retryWrites=true&w=majority&appName=hotel-api"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connectedDB;
