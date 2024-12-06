const express = require('express');
const router = express.Router();
const upload = require('../../middleware/multer');
const s3 = require('../../config/aws');

const uploadImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const fileUrls = req.files.map((file) => file.location); 
        res.status(200).json({
            message: 'Images uploaded successfully',
            imageUrls: fileUrls,
        });
    } catch (error) {
        res.status(500).json({ message: 'Image upload failed', error: error.message });
    }
};


const replaceImage = async (req, res) => {
    const oldKey = req.params.key; 
    try {
        await s3
            .deleteObject({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: oldKey,
            })
            .promise();

        const newFileUrl = req.file.location;

        res.status(200).json({
            message: 'Image replaced successfully',
            imageUrl: newFileUrl,
        });
    } catch (error) {
        res.status(500).json({ error: 'Image replacement failed', details: error.message });
    }
};

const deleteS3Object = async (key) => {
    await s3
        .deleteObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        })
        .promise();
};


module.exports={replaceImage,deleteS3Object,uploadImages}