const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const adminModel = require("../../model/admin")

const adminSignInController = async(req,res) => {
    try {
        const { email, password } = req.body
        const adminDetails =await adminModel.findOne({ email })
        const isPasswordValid = await bcrypt.compare(password, adminDetails.password);

        if (email != adminDetails.email) {
            return res.status(401).json({ message: 'Admin not found.. ' });
        }

        if (isPasswordValid && adminDetails) {
        
            const tokenData = {
                _id: adminDetails._id,
                email: adminDetails.email,
            };
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
                expiresIn: "7d",
            });
  
            res.cookies("adminToken", token, { httpOnly: true, secure: true }).json({
                success: "Login Successful",
                token: token,
                redirectUrl: "/adminDashboard"
            });
        }

       

    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' }); 
    }
}

module.exports=adminSignInController