const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//schema for student details
const users_seq_schema =new Schema({
    seq_id:String,
    sequence_value:Number
});

module.exports =  mongoose.model('users_seq', users_seq_schema);