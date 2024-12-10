const fs = require("fs");
const AWS = require("aws-sdk");

// Configure AWS Rekognition
const Rekognition = new AWS.Rekognition();

const detectFaceController = async (req, res) => {
    try {
        const photo = req.file;

        if (!photo) {
            return res.status(400).json({ message: "No photo uploaded" });
        }

        const params = {
            Image: {
                Bytes: fs.readFileSync(photo.path),
            },
        };

        // Call AWS Rekognition
        const result = await Rekognition.detectFaces(params).promise();

        if (result.FaceDetails.length > 0) {
            res.status(200).json({ message: "Face detected and verified", data: result });
        } else {
            res.status(400).json({ message: "No face detected. Please try again." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error processing image", error: error.message });
    }
};

module.exports = { detectFaceController };
