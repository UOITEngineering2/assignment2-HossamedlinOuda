const { timeStamp } = require('console');
const mongoose = require('mongoose');
const validator =require('validator');
// the database to collect the patient history 
const BlogSchema = new mongoose.Schema({
    Author : {
        type: String, 
        required : [true , "Please insert the author name"]
    }, 

    Content :{
        type : String 
    }, 

    Title :{
        type : String, 
        required : [true , " Please enter the title of the blog "]
    }, 
    CoverPhoto:{
        type: String
    }
},{timestamps:true});
const Blog = mongoose.model('Blog',BlogSchema);
module.exports=Blog;