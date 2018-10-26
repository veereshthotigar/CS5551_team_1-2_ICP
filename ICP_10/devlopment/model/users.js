const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//schema for student details
const users_schema =new Schema({
    user_id:Number,
    email_id:String,
    first_name:String,
    last_name:String,
    created_on:Date,
    updated_on:Date
});

module.exports =  mongoose.model('users', users_schema);