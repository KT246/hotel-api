const mongoose = require("mongoose");

const NhanVienSchema = new mongoose.Schema(
  {
    ten: String,
    chuc_vu: String,
    sdt: String,
    ca_lam_viec: String,
    luong: Number,
    hinh_anh: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("nhanVien", NhanVienSchema);
