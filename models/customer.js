const mongoose = require("mongoose");

const KhachHangSchema = new mongoose.Schema(
  {
    ten: String,
    dia_chi: String,
    sdt: String,
    email: String,
    password: String,
    hinh_anh: String,
    nhiem_vu: { type: String, default: "user" },
    dat_phong: [{ type: mongoose.Schema.Types.ObjectId, ref: "DatPhong" }],
    hoa_don: [{ type: mongoose.Schema.Types.ObjectId, ref: "HoaDon" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("KhachHang", KhachHangSchema);
