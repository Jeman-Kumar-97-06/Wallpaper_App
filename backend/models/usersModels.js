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
    if(!email || !password) {
        throw Error("All fields must be filled!")
    }
    const user = await this.findOne({email});
    if (!user) {
        throw Error("Wrong username/ user with that name doesn't exist");
    }
    const match = await bcrypt.compare(password,user.password);
    if (!match) {
        throw Error("Wrong password!")
    }
    return user;
}

userSchema.statics.signup = async function(){
    if(!fullname || !email || !password) {
        throw Error("All fields must be filled!")
    }
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

