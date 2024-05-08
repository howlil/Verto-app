const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const addAdmin = async (req, res ) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: "false",
        message: "data belum lengkap",
      });
    }

    const findAdmin = await prisma.User.findOne({
      where: {
        email: email,
      },
    });

    if (findAdmin) {
      return res.status(400).json({
        succes: false,
        message: "Username admin sudah pernah ditambahkan",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, salt);
      const addAdmin = await modelAdmin.create({
        username: username,
        password: hashedPass,
      });
      if (!addAdmin) {
        return res.status(400).json({
          success: false,
          message: "Admin tidak berhasil ditambahkan",
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "Admin berhasil ditambahkan" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Kesalahan server" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Silahkan lengkapi data akun anda",
      });
    }

    const findAdmin = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!findAdmin) {
      return res.status(400).json({
        success: false,
        message: "Akun anda tidak ditemukan",
      });
    }

    const isMatch = await bcrypt.compare(password, findAdmin.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password akun anda salah",
      });
    }

    const token = jwt.sign(
      { id: findAdmin.id, email: findAdmin.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1w" }
    );

    await prisma.token.create({
      data: {
        token: token,
        userId: findAdmin.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Login Berhasil",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Kesalahan server",
    });
  }
};

const coba = (req, res) => {
  res.status(200).json("hello");
};
module.exports = { addAdmin, loginAdmin, coba };
