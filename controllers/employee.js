const employee = require("../models/employee");

exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    const data = await employee(req.body).save();
    res.send({ message: "Tạo thành công!", data: data });
  } catch (error) {
    res.status(500).send("Sever error");
  }
};

exports.list = async (req, res) => {
  try {
    const data = await employee.find({}).exec();
    res.status(200).send({ message: "ok", data: data });
  } catch (error) {
    res.status(500).send("Sever error");
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await employee.findOne({ _id: id }).exec();
    res.status(200).send({ message: "ok", data: data });
  } catch (error) {
    res.status(500).send("Sever error");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await employee
      .findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      })
      .exec();
    res.status(200).send({ message: "Cập nhật thành công", data: data });
  } catch (error) {
    res.status(500).send("Sever error");
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    await employee.findOneAndDelete({ _id: id }).exec();
    res.status(200).send({ message: "Xóa thành công!" });
  } catch (error) {
    res.status(500).send("Sever error");
  }
};
