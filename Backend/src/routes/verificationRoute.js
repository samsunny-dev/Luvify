router.get("/verifiedStatus/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ verified: user.verified });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data", error: error.message });
    }
});

router.post("/verifyPhoto", upload.single("photo"), async (req, res) => {
    const photo = req.file;

    const params = {
        SourceImage: { S3Object: { Bucket: "your-bucket-name", Name: "reference-photo.jpg" } },
        TargetImage: { Bytes: fs.readFileSync(photo.path) },
    };

    try {
        const result = await rekognition.compareFaces(params).promise();
        if (result.FaceMatches.length > 0) {
            const matchScore = result.FaceMatches[0].Similarity;
            res.status(200).json({ verified: matchScore > 90, matchScore });
        } else {
            res.status(400).json({ message: "Face does not match reference photo." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error verifying photo", error: error.message });
    }
});
