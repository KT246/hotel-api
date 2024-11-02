const mongoose = require("mongoose");

const PhongSchema = new mongoose.Schema(
  {
    so_phong: { type: Number, unique: true },
    loai_phong: String,
    gia_mot_dem: Number,
    tinh_trang: String,
    hinh_anh: String,
    dat_phong: [{ type: mongoose.Schema.Types.ObjectId, ref: "DatPhong" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Phong", PhongSchema);
