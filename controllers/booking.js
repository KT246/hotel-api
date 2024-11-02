const mongoose = require("mongoose");
const booking = require("../models/booking");
const customer = require("../models/customer");
const room = require("../models/room");

exports.create_online = async (req, res) => {
  try {
    const phong_id = await room.findOne({ _id: req.body.phong_id }).exec();
    if (phong_id.tinh_trang !== "trong") {
      return res.send({ message: "Phòng đang thuê hoặc sửa" });
    }
    const data = await booking(req.body).save();
    res.send({ message: "Create booking successful", data: data });
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.create_offline = async (req, res) => {
  const { ten, dia_chi, sdt, phong_so, ngay_dat, ngay_tra, tong_tien } =
    req.body;
  try {
    const phong_id = await room.findOne({ so_phong: phong_so }).exec();
    if (phong_id.tinh_trang !== "trong") {
      return res.send({ message: "Phòng đang thuê hoặc sửa" });
    }
    const customer_id = await customer({
      ten,
      dia_chi,
      sdt,
    }).save();

    // console.log(customer_id);

    const data = await booking({
      khach_hang_id: customer_id._id,
      phong_id: phong_id._id,
      ngay_dat,
      ngay_tra,
      tong_tien,
      trang_thai: "da_xac_nhan",
    }).save();

    await room
      .findOneAndUpdate(
        { _id: data.phong_id },
        {
          $set: { tinh_trang: "dang_thue" },
        },
        {
          new: true,
        }
      )
      .exec();
    res.send({ message: "Create booking successful", data: data });
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await booking.find({}).exec();

    res.send({ message: "Create booking successful", data: data });
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await booking.find({ _id: id }).exec();
    res.send({ message: "Create booking successful", data: data });
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await booking
      .findOne({ _id: id }, req.body, { new: true })
      .exec();
    res.send({ message: "Cập nhật đặt phòng thành công! ", data: data });
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.update_getRoom = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await booking.findOne({ _id: id }).exec();
    await room
      .findOneAndUpdate(
        { _id: data.phong_id },
        {
          $set: { tinh_trang: "dang_thue" },
        },
        {
          new: true,
        }
      )
      .exec();
    res.send({ message: "update booking successful", data: data });
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.update_active = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await booking
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            trang_thai: "da_xac_nhan",
          },
        }
      )
      .exec();
    await room
      .findOneAndUpdate(
        { _id: data.phong_id },
        {
          $set: { tinh_trang: "da_dat" },
        },
        {
          new: true,
        }
      )
      .exec();
    res.send({ message: "Đã đặt phòng thành công!", data: data });
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};

exports.remove = async (req, res) => {
  try {
    //
    const id = req.params.id;
    const data = await booking.findOne({ _id: id }).exec();
    await room
      .findOneAndUpdate(
        { _id: data.phong_id },
        {
          $set: {
            tinh_trang: "trong",
          },
        },
        { new: true }
      )
      .exec();
    await booking.findOneAndDelete({ _id: id }).exec();
    res.send({ message: "Hủy thành công!" });
  } catch (error) {
    res.send({ message: "Sever error", error: error });
  }
};
