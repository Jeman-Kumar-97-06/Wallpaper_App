const express = require('express');
const {v2:cloudinary} = require('cloudinary');
const multer = require('multer');
const router = express.Router();
const fs     = require('fs');
const path   = require('path');
const Wall   = require('../models/wallsModel');

const uploadDir = path.join(__dirname,'uploads');

const {
    getWalls,
    getWall,
    downloadWalls
}               = require('../controllers/wallControllers');

if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

//Cloudinary Config:
cloudinary.config({
    
});

//Storage Config:
const storage = multer.diskStorage(
    {
        destination : function(req,file,cb) {cb(null,uploadDir)},
        filename    : function(req,file,cb) {cb(null,`${Date.now()}-${file.originalname}`)}
    }
)

//File Upload Config:
const upload = multer({storage:storage});

const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/',getWalls);

router.get('/:id',getWall);

//Saves the 'upload' folder first then saves the file path to mongodb:
