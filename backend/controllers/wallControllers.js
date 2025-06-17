const mongoose = require('mongoose');
const Wall     = require('../models/wallModel');

//Send all the wallpapers to the client:
const getWalls = async (req,res) => {
    //Get all the wallpapers
    const all_walls = await Wall.find({}).populate('user_id','name');
    if (!all_walls) {
        return res.status(404).json({error:"No Wallpapers found!"})
    };
    res.status(200).json(all_walls);
};

//Send a specified wallpapar:
const getWall = async (req,res) => {
    const {id} = req.params;
    //See if the 'id' is of proper format:
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"The ID isn't valid!"})
    }
    const wallpaper = await Wall.findById(id);
    //If No matching wallpaper is found:
    if (!wallpaper) {
        return res.status(404).json({error:"No Wallpaper found with the given details :("})
    };
    return res.status(200).json(wallpaper);
};

//Letting an Authenticated User Upload Wallpaper:
const uploadWalls = async (req,res) => {
    if (!req.file){
        return res.status(400).json({error:"Invalid file type! only JEPG format allowed :("})
    }
    const {path} = req.file;
    try {
        user_id = req.user._id;
        const new_wall = await Wall.create({wall:path,user_id:user_id});
        return res.status(200).json(new_wall);
    } catch(err) {
        return res.status(404).json({error:`${err.message}`});
    }
};

//Letting an Authorized User Download Wallpapaper : 
const downloadWalls = async (req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"The ID isn't valid!"})
    }
    const wallpaper = await Wall.findById(id);
    //Sending image response to the client:
    res.download(wallpaper.wall,wallpaper.wall,(error)=>{
        if (error) {
            console.log(error);
            res.status(500).json({error:error.message})
        }
    })
}

module.exports = {getWalls,getWall,uploadWalls,downloadWalls};