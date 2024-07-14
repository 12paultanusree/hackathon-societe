const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/hackathonsociety');

//check database connection
connect.then(() => {
    console.log('Connected to database successfully');
})
.catch(() => {
    console.log('Database cannot be connected');
});

//create schema
const LoginSchema = new mongoose.Schema({
 name: {
    type:String,
    required:true
 }
,
 email: {
    type:String,
    required:true
 }
,
 password: {
    type:String,
    required: true
 }
});

//collection part creating a model
const collection = new mongoose.model("users",LoginSchema);

module.exports = collection;