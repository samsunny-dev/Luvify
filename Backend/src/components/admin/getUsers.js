const userModel = require("../../model/user")


const userDetails = async (req, res) => {
    try {
        const allUsers = await userModel.find()
            .populate({
                path: 'referencedField',
                select: 'name phoneOrEmail gender preferredGenders photos'
            })
        if (allUsers.length==0) {
            return res.status(403).json({
                message: "No users found",allUsers
            })
        }
        return res.status(200).json({ success: true, allUsers });
    } catch (error) {
        console.error("Error in fetching User details:", error)
        return res.status(500).json({ error: "Failed to retrieve Users." })
    }
}

module.exports=userDetails