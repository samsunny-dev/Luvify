const express = require('express');
const router = express.Router();
const upload = require('../../middleware/multer');
const s3 = require('../../config/aws');

const uploadImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const fileUrls = req.files.map((file) => 
            file.location|| `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`
        );
        
       res.status(200).json({
            message: 'Images uploaded successfully',
            imageUrls: fileUrls,
        });
    } catch (error) {
        if (error.name === 'NoSuchBucket') {
            return res.status(404).json({ message: 'Bucket not found' });
        }
        if (error.name === 'AccessDenied') {
            return res.status(403).json({ message: 'Access denied to S3 bucket' });
        }
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
    
};


const replaceImage = async (req, res) => {
    const oldKey = req.params.key; 
    try {
        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: oldKey,
            })
        )

        const newFileUrl = req.file.location || 
            `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.file.key}`;
        
        res.status(200).json({
            message: 'Image replaced successfully',
            imageUrl: newFileUrl,
        });
    } catch (error) {
        res.status(500).json({ error: 'Image replacement failed', details: error.message });
    }
};

const deleteS3Object = async (key) => {
    await s3Client.send(
        new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
        })
    );
};


module.exports={replaceImage,deleteS3Object,uploadImages}