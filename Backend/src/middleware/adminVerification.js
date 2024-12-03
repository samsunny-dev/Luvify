
const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_SECRET_KEY; 

const adminVerify = (req, res, next) => {

    try {
        const admin_Token = req.cookies.adminToken;

        if (!admin_Token) {
           return res.status(403).json({
                message: "Admin token is not found",
                error: true,
                
           })
        
        }
            
        jwt.verify(admin_Token , secretKey , (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: 'Invalid token',
                    success: false,
                    error: true
                  });
            }
            req.admin = decoded
            next()
        })
    
        
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
          });
    }
  
}

module.exports=adminVerify