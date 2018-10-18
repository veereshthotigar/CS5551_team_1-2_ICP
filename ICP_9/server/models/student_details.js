const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const student_details = new Schema({
    class_id: Number,
    student_name: String,
    course_of_study: String,
    major: String,
    minor: String,
    created_on:Date,
    updated_on:Date
});

module.exports =  mongoose.model('student_details', student_details);