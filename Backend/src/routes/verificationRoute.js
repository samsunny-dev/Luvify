const express = require("express")
const verificationRoute = express()
const User = require("../model/user");
const  uploadPhoto  = require("../middleware/uploadMiddleware");

verificationRoute.get("/status/:userId", async (req, res) => {
    const userId=req.params.userId
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ verified: user.isVerified==true });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data", error: error.message });
    }
});

verificationRoute.post("/photo", uploadPhoto.single("photo"), async (req, res) => {
    const photo = req.file.path;

    const params = {
        SourceImage: { S3Object: { Bucket: process.env.AWS_S3_BUCKET_NAME, Name: "reference-photo.jpg" } },
        TargetImage: { Bytes: fs.readFileSync(photo) },
    };

    try {
        const result = await rekognition.compareFaces(params).promise();
        if (result.FaceMatches.length > 0) {
            const matchScore = result.FaceMatches[0].Similarity;
            res.status(200).json({ verified: matchScore > 90, matchScore });
        } else {
            await unlinkAsync(photoPath);
            res.status(400).json({ message: "Face does not match reference photo." });
        }
    } catch (error) {
        await unlinkAsync(photoPath);
        res.status(500).json({ message: "Error verifying photo", error: error.message });
    }
});



module.exports = verificationRoute;
