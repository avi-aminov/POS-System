
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const maxSize = 1 * 1024 * 1024; // 1MB in bytes

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Set the destination folder for uploads
    },
    filename: function (req, file, cb) {
        const randomFileName = uuidv4(); // Generate a random filename
        cb(null, randomFileName + path.extname(file.originalname)); // Keep the original file extension
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize,
    },
}).array('files');

const uploadFile = async (req, res) => {
    console.log('Received file upload request:', req.body, req.files);

    upload(req, res, (err) => {
        if (err) {
            console.error('Error handling file upload:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Handle the uploaded files here
        res.status(200).json({ message: 'Files uploaded successfully' });
    });
};

const getImages = async (req, res) => {
    const uploadDirectory = 'public/uploads/';

    fs.readdir(uploadDirectory, (err, files) => {
        if (err) {
            console.error('Error reading upload directory:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(file));
        const imageList = imageFiles.map(filename => ({ filename }));

        res.json(imageList);
    });
};

const deleteImage = async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../public/uploads/', filename);

    // Delete the file from the uploads directory
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json({ success: true });
    });
};


module.exports = {
    uploadFile,
    getImages,
    deleteImage,
};