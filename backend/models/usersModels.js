const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const validator = require('validator');
const Schema    = mongoose.Schema;

const userSchema = new Schema ({
    fullname : {type:String,required:true},
    email    : {type:String,required:true},
    password : {type:String,required:true}
});

userSchema.statics.login = async function(){
    //Check if all the fields are filled :
    if(!email || !password) {
        throw Error("All fields must be filled!")
    }
    //See if you can find a user document with the same email : 
    const user = await this.findOne({email});
    //If such a user doesn't exist throw an err saying the user with that email doesn't exist : 
    if (!user) {
        throw Error("Wrong username/ user with that name doesn't exist");
    }
    //See if the password is right:
    const match = await bcrypt.compare(password,user.password);
    if (!match) {
        throw Error("Wrong password!")
    }
    //Return the user object:
    return user;
}

userSchema.statics.signup = async function(){
    //See if all the fields are filled:
    if(!fullname || !email || !password) {
        throw Error("All fields must be filled!")
    }
    //Validate and see if the password is strong enough : 
    if(!validator.isStrongPassword(password)){
        throw Error("Password ain't strong enough!")
    }
    
    const exists = await this.findOne({email});
    if (exists) {
        throw Error("User already exists")
    }
    const salt = await bcrypt.getSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const user = await this.create({fullname,email,password:hash});
    return user;
};

