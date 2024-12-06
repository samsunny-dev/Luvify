const adminLogoutController = async (req, res) => {
    try {
        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });
  
      return res.status(200).json({
        success: true,
        message: "Admin logged out successfully",
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: true,
      });
    }
  };
  
  module.exports = adminLogoutController;
  