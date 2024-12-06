const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminModel = require("../../model/admin");

const adminSignInController = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Email:", email);
        console.log("Password:", password);

        const adminDetails = await adminModel.findOne({ email });
        if (!adminDetails) {
            return res.status(401).json({ message: 'Admin not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, adminDetails.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate token
        const tokenData = {
            _id: adminDetails._id,
            email: adminDetails.email,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "7d",
         });

        res.cookie("adminToken", token, { httpOnly: true , secure:process.env.NODE_ENV==="production"})
            .status(200)
            .json({
                success: true,
                message: "Login Successful",
                token: token,
                adminDetails: {
                    _id: adminDetails._id,
                    name: adminDetails.name,
                    email: adminDetails.email,
                    role: adminDetails.role,
                },
                redirectUrl: "/adminDashboard",
            });
        
        } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error', error: true });
    }
};

module.exports = adminSignInController;
