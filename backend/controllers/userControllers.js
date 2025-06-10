const User           = require('../models/usersModel');
const jwt            = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library')

const createToken = (id) => {
    return jwt.sign({_id:id},process.env.SEC,{expiresIn:'3d'});
}

//Initialize Google Client : 
const client = new OAuth2Client(process.env.GOOGLECLIENTID);

//Login Users with Google : 
const googleLogin = async (req,res) => {
    const {credential} = req.body;
    try{
        const ticket = await client.verifyIdToken({
            idToken : credential,
            audience: process.env.GOOGLECLIENTID
        });
        const payload = ticket.getPayload();
        const {email,name,sub:googleId} = payload;
        //Check if user exists in mongodb:
        let user = await User.findOne({email});
        if (!user) {
            user = await User.create({
                name,email,password:''
            })
        }
    }

}