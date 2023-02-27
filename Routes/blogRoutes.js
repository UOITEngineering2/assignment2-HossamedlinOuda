const express  = require ('express');
const blogController = require('../Controllers/blogController');
const { requireAuth } = require("../middleware/authMiddleware");
const app = express();
const cors = require('cors')
app.use(cors());

    
app.post('/createBlog',requireAuth,blogController.createBlog);
app.get('/getBlogs' , requireAuth , blogController.getBlogs);
module.exports= app;