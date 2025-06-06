const User           = require('../models/usersModels');
const jwt            = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');

const {createToken} = (id) => {
    return jwt.sign({_id:id},process.env.SEC,{expiresIn:'3d'});
}

//Initialize Google Client : 
const client = new OAuth2Client(process.env.GOOGLECLIENTID);

//Login users with google account : 
const googleLogin = async (req,res) => {
    const {credential} = req.body;
    try {
        const ticket = await client.verifyIdToken
    }
}


