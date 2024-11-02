const mongoose = require("mongoose");

const HoaDonSchema = new mongoose.Schema(
  {
    khach_hang_id: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
    dat_phong_id: { type: mongoose.Schema.Types.ObjectId, ref: "DatPhong" },
    tong_tien_phong: Number,
    tong_tien: Number,
    ngay_thanh_toan: Date,
    phuong_thuc_thanh_toan: String,
    trang_thai: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("HoaDon", HoaDonSchema);
