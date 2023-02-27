const Blog = require("../models/Blog");

const mongoose = require("mongoose");

require("dotenv").config();

module.exports.createBlog = async (req, res) => {
  let { Author, Content, Title, CoverPhoto } = req.body;
  console.log("INSIDE BLOG CREATE AND THE DATA PASSED ARE ", Author , Content , Title, CoverPhoto);
  try {
    const blog = await Blog.create({
        Author,
        Content,
        Title,
        CoverPhoto,
    });
    res.status(201).json("Successfully saved blog");
  } catch (err) {
    console.log("error occured during creating the blog process ", err);
    res.status(400).json("error occured during creating the blog process");
  }
};



module.exports.getBlogs = async (req , res ) =>{
    console.log("ENTERED THE GET BLOGS ");
    let collections = await Blog.find();
    console.log(collections);
    res.send(JSON.stringify(collections));
};