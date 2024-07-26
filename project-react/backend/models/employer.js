const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    Emp_Id: { type: String, required: true,unique:true },
    co_name: { type: String, required: true },
    type: { type: String, required: true },
    place: { type: String, required: true },
    email: { type: String, required: true },
    about:{type:String,},
    password: { type: String, required: true },
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;

