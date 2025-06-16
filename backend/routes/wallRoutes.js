const express = require('express');
const multer  = require('multer');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');
const Wall    = require('../models/wallModel');
const cloudinary = require('cloudinary');

const uploadDir = path.join(__dirname,'uploads');

const {
    getWalls,
    getWall,
    uploadWalls,
    downloadWalls
}               = require('../controllers/wallControllers');

//Upload dir is created whereever you are going to deploy this code:
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
};

//Cloudinary Config : 
cloudinary.config({
    cloud_name:'dt0zcc0ec',
    api_key:'363287392839592',
    api_secret:process.env.API_SEC
})

//Storage Config:
const storage = multer.diskStorage(
    {
        destination : function(req,file,cb){cb(null,uploadDir)},
        filename    : function(req,file,cb){cb(null,`${Date.now()}-${file.originalname}`)}
    }
)

//File Upload Config : 
const upload = multer({storage:storage});

const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/',getWalls);

router.get('/:id',getWall);

//Saves to 'upload' folder first then saves the file path to mongodb:
router.post('/',(req,res,next) => {
    console.log("Received request for file upload.");
    upload.single('wall_pic')(req,res,(err)=>{
        if (err) {
            console.log("Multer error : ",err);
            return res.status(400).json({error:err.message});
        }
        console.log('File uploaded: ',req.file);
        console.log("Request body:",req.body.title);

        next();
    })
},async (req,res) => {
    try {
        if (!req.file) {
            return res.status(400).json({error:"No File Uploaded"})
        }
        console.log("File received: ",req.file.path);
        //Uploading to cloudinary:
        const uploadResult = await cloudinary.uploader.upload(req.file.path);
        console.log(uploadResult)
        //Remove the file as soon as it is uploaded to cloudinary : 
        fs.unlinkSync(req.file.path)
        console.log("success")
        //Send the Image URL to client : 
        try {
            user_id = req.user._id;
            console.log("user_id is: ",user_id)
            const new_wall = await Wall.create({title:req.body.title,category:req.body.category,description:req.body.description,wall:uploadResult.secure_url,user_id:user_id});
            console.log(new_wall)
            res.status(200).json(new_wall);
        } catch (err) {
            console.log("Aah shit")
            console.log(err)
            res.status(404).json({error:`${err.message}`});
        }
    } catch (error) {
        console.log("upload error: ",error);
        res.status(500).json({error:"Upload failed!"})
    }
})

router.get('/download/:id',downloadWalls);

module.exports = router;
