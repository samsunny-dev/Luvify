

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminModel = require("../../model/admin");

const adminSignUpController = async (req, res) => {
  try {
    const admins = [
      {
        name: "Libin Seban",
        email: process.env.EMAIL_OF_LIBIN,
        password: process.env.PASSWORD_OF_LIBIN,
      },
      {
        name: "Sam Sunny",
        email: process.env.EMAIL_OF_SAM,
        password: process.env.PASSWORD_OF_SAM,
      },
    ];

    const createdAdmins = [];

    for (const admin of admins) {
      const existingAdmin = await adminModel.findOne({ email: admin.email });

      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        const adminData = new adminModel({
          name: admin.name,
          email: admin.email,
          password: hashedPassword,
          role: "ADMIN",
        });

        const savedAdmin = await adminData.save();
        createdAdmins.push(savedAdmin);
      }
      }
      
    const responseToken = jwt.sign(
      { ids: createdAdmins.map((admin) => admin._id) },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
      );
      
    res.cookie("adminToken", responseToken, { httpOnly: true });
    res.status(200).json({
      data: createdAdmins,
      success: true,
        error: false,
      message: "Admin Created Successfully",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};


module.exports=adminSignUpController
