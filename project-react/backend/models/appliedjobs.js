const {Schema,model}= require('mongoose')
const { type } = require('os')

const demo=new Schema({
    job_id:{type:String,required:true},
    job:{type:String,required:true},
    can_name:{type:String,required:true},
    email:{type:String,required:true},
    course:{type:String,required:true},
    skills:{type:String,required:true},
    place:{type:String,},
    // description:{type:String,required:true},
    action:{type:String,required:true},
    postedBy:{ type: String, required: true},
    ldate:{type:String,ref:'job-list'},
    



})


const sample=model('applied-jobs',demo)
module.exports=sample;