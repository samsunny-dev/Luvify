const jwt = require("jsonwebtoken");
const User = require("../model/user")

const adminAuthenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access forbidden: Admins only" });
        }

        req.userId = user._id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = adminAuthenticate;
