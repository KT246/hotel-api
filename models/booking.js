const mongoose = require("mongoose");
const { type } = require("os");

const DatPhongSchema = new mongoose.Schema(
  {
    khach_hang_id: { type: mongoose.Schema.Types.ObjectId, ref: "KhachHang" },
    phong_id: { type: mongoose.Schema.Types.ObjectId, ref: "Phong" },
    ngay_dat: Date,
    ngay_tra: Date,
    tong_tien: Number,
    trang_thai: { type: String, default: "cho_xac_nhan" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DatPhong", DatPhongSchema);
