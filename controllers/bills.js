const bills = require("../models/bills");

exports.create = async (req, res) => {
  try {
    await bills(req.body).save();
    res.status(200).send({ message: "create bills successful" });
  } catch (error) {
    res.status(500).send({ message: "Sever error", error: error });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await bills.find({}).exec();
    res.status(200).send({ message: "get list bills successful", data: data });
  } catch (error) {
    res.status(500).send({ message: "Sever error", error: error });
  }
};

exports.read = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await bills.findOne({ _id: id }).exec();
    res.status(200).send({ message: "ok", data: data });
  } catch (error) {
    res.status(500).send({ message: "Sever error", error: error });
  }
};
