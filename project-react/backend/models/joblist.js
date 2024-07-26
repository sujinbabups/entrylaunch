const {Schema,model}= require('mongoose')
const { type } = require('os')

const demo=new Schema({
    job_id:{type:String,required:true,unique:true},
    job_name:{type:String,required:true},
    location:{type:String,required:true},
    skills:{type:String,required:true},
    date:{type:String,required:true},
    postedBy: { type: String, ref: 'Employer', required: true }


})


const sample=model('job-list',demo)
module.exports=sample;