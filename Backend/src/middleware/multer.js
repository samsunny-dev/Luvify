const multer = require('multer');
const multerS3 = require('multer-s3');
<<<<<<< HEAD
const s3 = require('../config/awsConfig');
=======
const s3 = require('../config/aws');
>>>>>>> aa4ec76b7e4eae2189ea675b610612cf878185c4

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `uploads/${Date.now().toString()}-${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG, GIF, and WebP image files are allowed'), false);
        }
    },
});

module.exports = upload;
