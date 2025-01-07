const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { RekognitionClient, DetectFacesCommand } = require("@aws-sdk/client-rekognition");
const s3Client = require("../../config/awsConfig");

const rekognitionClient = new RekognitionClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const detectFaceController = async (req, res) => {
    try {
        const photo = req.file;

        if (!photo) {
            return res.status(400).json({ message: "No photo uploaded" });
        }

        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const key = `uploads/${Date.now()}-${photo.originalname}`;

        // Upload the file to S3
        const uploadParams = {
            Bucket: bucketName,
            Key: key,
            Body: fs.createReadStream(photo.path),
            ContentType: photo.mimetype,
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        // Rekognition parameters
        const rekognitionParams = {
            Image: {
                S3Object: {
                    Bucket: bucketName,
                    Name: key,
                },
            },
        };

        const detectFacesCommand = new DetectFacesCommand(rekognitionParams);
        const result = await rekognitionClient.send(detectFacesCommand);

        // Optionally delete the file from S3
        await s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));

        if (result.FaceDetails.length > 0) {
            res.status(200).json({ message: "Face detected and verified", data: result });
        } else {
            res.status(400).json({ message: "No face detected. Please try again." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error processing image", error: error.message });
    }
};

module.exports = { detectFaceController };
