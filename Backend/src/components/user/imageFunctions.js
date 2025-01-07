const express = require('express');
const { Upload } = require('@aws-sdk/lib-storage');
const { upload, uploadToS3 } = require('../../middleware/multer')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3 = require('../../config/awsConfig.js');
const { GetObjectCommand, DeleteObjectCommand,ListObjectsV2Command } = require('@aws-sdk/client-s3');
const User=require("../../model/user.js")

const uploadImages = async (req, res) => {
    const userId=req.user.userId

    try {

        const user = await User.findById({ userId });
        if (!user) {
            return res.status(401).json({ message: "No user found with this ID" });
        }
        

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        console.log('Files:', req.files);

        const fileUrls = await uploadToS3(req.files);
        user.photos.push(...fileUrls);  
        await user.save();
        res.status(200).json({
            message: 'Images uploaded successfully',
            imageUrls: fileUrls,
        });
        


    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'An error occurred during upload', error: error.message });
    }
};


const getAllImages = async (req, res) => {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;  
  
    if (!bucketName) {
      return res.status(400).send('Bucket name is not defined.');
    }
  
    try {
      const listParams = {
        Bucket: bucketName,
      };
  
      const listData = await s3.send(new ListObjectsV2Command(listParams));
      
      const imageUrls = [];
    for (let item of listData.Contents) {
      const getParams = {
        Bucket: bucketName,
        Key: item.Key,
      };

      const command = new GetObjectCommand(getParams);
      
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); 
      imageUrls.push({ key: item.Key, url });
    }

    res.status(200).json(imageUrls);  
  
    } catch (err) {
      console.error('Error retrieving files:', err);
      res.status(500).send('Error retrieving files');
    }
  };
  
  

const replaceImage = async (req, res) => {
    try {
        const oldKeys = req.params.keys.split(',');
        const newFileUrls = [];

        if (oldKeys.length !== req.files.length) {
            return res.status(400).json({ message: 'Mismatch between old and new files count' });
        }

        for (let i = 0; i < oldKeys.length; i++) {
            const deleteParams = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: oldKeys[i],
            };

            await s3.send(new DeleteObjectCommand(deleteParams)); 
        }

        const fileUrls = await uploadToS3(req.files); 
        fileUrls.forEach(url => newFileUrls.push(url));  

        res.status(200).json({
            message: 'Images replaced successfully',
            imageUrls: newFileUrls,
        });
    } catch (error) {
        console.error('Replace error:', error);
        res.status(500).json({ error: 'Image replacement failed', details: error.message });
    }
};


// Delete object from S3
const deleteS3Object = async (key) => {
    try {
        const deleteParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
        };

        await s3.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error; 
    }
};
module.exports = { uploadImages, replaceImage, deleteS3Object,getAllImages };
