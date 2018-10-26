const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//schema for student details
const drug_schema =new Schema({}, { strict: false });
const product_schema = new Schema({
    name : String,
    created_on:Date,
    updated_on:Date
});
module.exports =  mongoose.model('drug', drug_schema);
module.exports =  mongoose.model('products', product_schema);