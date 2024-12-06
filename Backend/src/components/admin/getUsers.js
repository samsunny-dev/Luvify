const userModel = require("../../model/user")

const allUserDetails = async (req, res) => {
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


const findUser = async (req, res)=>{
    const {userId}  = req.query
try {
    const fetchUser = await userModel.findById(userId)
    .populate({
        path: 'referencedField',
        select: 'name phoneOrEmail gender preferredGenders photos'
    })
    if (!fetchUser) {
        return res.status(403).json({
            message: "No user found for this ID",
            success:false
        })

    }

    return res.status(200).json({ message:"User details fetched succesfully",success: true, fetchUser });


} catch (error) {
    console.error("Error in fetching User details:", error)
        return res.status(500).json({ error: "Failed to retrieve User." })
}

}


module.exports={allUserDetails,findUser}