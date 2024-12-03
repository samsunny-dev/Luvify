const userModel = require("../../model/user")

const deleteUser = async (req, res) => {
  const userId = req.cookies.userId
    try {
      const userDetails = await userModel.findByIdAndDelete({ userId })
      
      if (!userDetails) {
        return res
        .status(404)
        .json({
          error:
            "User not found or user details missing in DB",
        });
}
  
return res.status(200).json({ message: "User deleted successfully" });



    } catch (error) {
      console.error('Error in removing user', error.message)
      res.status(500).json({
 error: "Internal Server Error"
      })

    }
}

module.exports=deleteUser