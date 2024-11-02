const room = require("../models/room");

exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    const data = await room(req.body).save();
    res.send({ message: "Tạo phòng thành công!", data: data });
  } catch (error) {
    res.status(500).send("Sever error");
  }
};

exports.list = async (req, res) => {
  try {
    // console.log(req.body);
    const data = await room.find({}).exec();
    res.send({ message: "Get list success", data: data });
  } catch (error) {
    res.status(500).send("Sever error");
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await room.find({ _id: id }).exec();
    res.send({ message: "Get room success", data: data });
  } catch (error) {
    res.status(500).send("Sever error");
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await room
      .findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      })
      .exec();
    res.send({ message: "Cập nhật phòng thành công!", data: data });
  } catch (error) {
    res.status(500).send("Sever error");
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await room.findOne({ _id: id }).exec();
    if (data.tinh_trang === "dang_thue") {
      return res.send({ message: "Phòng đang thuê không thể xóa được." });
    }
    await room.findOneAndDelete({ _id: id }).exec();
    res.send({ message: "Đã xóa phòng thành công!" });
  } catch (error) {
    res.status(500).send("Sever error");
  }
};
