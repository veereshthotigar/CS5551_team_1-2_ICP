const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//schema for student details
const events_schema =new Schema({
    eventName:String,
    eventStartDate:Date,
    eventEndDate:Date,
    address_one:String,
    address_two:String,
    address_city:String,
    address_state:String,
    address_zipcode:Number,
    users_list:Array,
    created_by:String,
    created_on:Date,
    updated_on:Date
});

module.exports =  mongoose.model('events', events_schema);