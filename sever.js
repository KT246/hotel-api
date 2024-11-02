require("dotenv").config();
// step 1
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");

const { readdirSync } = require("fs");

const app = express();

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const checkDB = mongoose.connect(process.env.MONGODB_URI);
if (checkDB) {
  console.log("connected!");
}

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);
// app.use("/api", authRouter);
// app.use("/api", productRouter);

// step 2
app.listen(5001, () => console.log("Server is running on port 5001"));
