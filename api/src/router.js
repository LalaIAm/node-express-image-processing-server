const express = require('express');
const router = express.Router();
const multer = require('multer');


const filename = (req, file, callback) => {
    callback(null, file.originalName)
}

const storage = multer.diskStorage({
    destination: 'api/uploads',
    filename: filename
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype !== 'image/png') {
        req.fileValidationError = 'Wrong file type';
        callback(null, false, new Error('Wrong file type'))
    } else {
        callback(null, true)
    }
}

const upload = multer({
    fileFilter: fileFilter,
    storage: storage
})

router.post('/upload', upload.single('photo'), (req, res) => {
    if (req.fileValidationError) {
        res.status(400).json({error: req.fileValidationError})
    }
    res.status(201).json({success: true})
})

module.exports = router;