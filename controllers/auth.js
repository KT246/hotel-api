const auth = require("../models/customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. check emil
    const checkEmail = await auth.find({ email: email }).exec();
    if (checkEmail.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    const data = await auth({
      email: email,
      password: hashPassword,
    }).save();
    res.send({ message: "Đăng ký thành công!", data: data });
  } catch (error) {
    res.status(500).send({ message: "Sever error", error: error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log({ email, password });

    // 1. check emil
    const user = await auth.find({ email }).exec();
    if (!user) {
      return res.status(400).send({ message: "Email không đúng!" });
    }
    // 2. check password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).send({ message: "Password không đúng!" });
    }
    //3. playload
    const playload = {
      id: user[0]._id,
      email: user[0].email,
      role: user[0].nhiem_vu,
    };
    // 4. generate token
    jwt.sign(
      playload,
      process.env.SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          return res.status(500).send({ message: "Sever error", error: err });
        }

        res.json({ playload, token });
      }
    );
  } catch (error) {
    res.status(500).send({ message: "Sever error", error: error });
  }
};
