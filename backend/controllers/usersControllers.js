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
        const ticket = await client.verifyIdToken({
            idToken : credential,
            audience : process.env.GOOGLECLIENTID
        })
        const payload = ticket.getPayload();
        const {email,name,sub:googleId} = payload;
        let user = await User.findOne({email});
        if (!user) {
            user = await User.create({
                name,email,password:''
            })
        }
        //Create a JWT:
        const token = createToken(user._id);
        return res.status(200).json({...user,token});
    }
    catch(error) {
        console.log(error);
        return res.status(400).json({message:"Google Login Failed!"})
    }
}

//Logging in with details filled manually:
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
        return res.status(200).json({...user,token});
    } catch(error) {
        return res.status(404).json({error:error.message});
    }
};

//Signup Controller:
const signupUser = async (req,res) => {
    const {fullname,email,password} = req.body;
    try {
        const user = await User.signup(fullname,email,password);
        
    } catch(error) {
        return res.status(404).json({error:error.message})
    }
}
