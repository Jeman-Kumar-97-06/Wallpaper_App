const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const wallSchema = new Schema({
    title       :{type:String,required:true},
    category    :{type:String,required:true},
    wall        :{type:String,required:true},
    user_id     :{type:String,required:true},
    description :{type:String,required:true}
});

module.exports = mongoose.model('wall_pi',wallSchema);