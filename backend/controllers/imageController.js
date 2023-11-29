const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const answer = require('../utils/answer');
const Media = require('../models/Media'); // Adjust the path based on your project structure


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
    if (!req.user.id) return answer(401, 'User Not Exist', res);

    const userID = req.user.id; // Assuming the user ID is available in req.user

    upload(req, res, async (err) => {
        if (err) {
            console.error('Error handling file upload:', err);
            return answer(500, 'Internal Server Error', res);
        }

        // Extract the file paths from req.files
        const filePaths = req.files.map((file) => {
            return file.filename;
        });

        // Insert file paths into the database with associated userID
        try {
            await Media.bulkCreate(filePaths.map((path) => ({ path, userID })));
            console.log('Files added to the database successfully');
            return answer(200, 'Files uploaded and added to the database successfully', res);
        } catch (error) {
            console.error('Error adding files to the database:', error);
            return answer(500, 'Internal Server Error', res);
        }
    });
};

const fetchImages = async (req, res) => {
    try {
        if (!req.user.id) return answer(401, 'User Not Exist', res);

        const userID = req.user.id;
        const media = await Media.findAll({
            where: { userID },
        });

        if (!media || media.length === 0) {
            return answer(200, 'fetchImages empty media', res, []);
        }

        return answer(200, 'fetchImages successfully', res, media);
    } catch (error) {
        console.error(error);
        return answer(500, 'Failed to fetch customers', res);
    }
};

const deleteImage = async (req, res) => {
    if (!req.user.id) return answer(401, 'User Not Exist', res);

    const userID = req.user.id;
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../public/uploads/', filename);

    // Delete the file from the uploads directory
    fs.unlink(filePath, async (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return answer(500, 'Internal Server Error', res);
        }

        // Delete the corresponding record from the database
        try {
            const deletedCount = await Media.destroy({
                where: {
                    path: filename,
                    userID: userID,
                },
            });

            if (deletedCount === 1) {
                return answer(200, 'File and database record deleted successfully', res);
            } else {
                return answer(404, 'File not found in the database', res);
            }
        } catch (error) {
            console.error('Error deleting file from the database:', error);
            return answer(500, 'Internal Server Error', res);
        }
    });
};


module.exports = {
    uploadFile,
    deleteImage,
    fetchImages,
};