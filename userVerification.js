const jwt = require("jsonwebtoken");
const secretKey = process.env.TOKEN_SECRET_KEY;

const userVerify = (req, res, next) => {
    if (!secretKey) {
        return res.status(500).json({
            message: "Token secret key is not configured",
            success: false,
            error: true
        });
    }

    try {
        const user_token = req.cookies.user_token;

        if (!user_token) {
            return res.status(403).json({
                message: "User token is not found",
                success: false,
                error: true
            });
        }

        jwt.verify(user_token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: 'Invalid token',
                    success: false,
                    error: true
                });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            success: false,
            error: true
        });
    }
}

module.exports = userVerify;