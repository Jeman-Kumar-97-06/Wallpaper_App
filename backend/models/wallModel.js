const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const wallSchema = new Schema({
    title       :{type:String,required:true},
    category    :{type:String,required:true},
    wall        :{type:String,required:true},
    user_id     :{type:Schema.Types.ObjectId,ref:"wallpiuser",required:true},
    description :{type:String,required:false}
});

module.exports = mongoose.model('wall_pi',wallSchema);