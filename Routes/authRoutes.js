const express  = require ('express');
const authController = require('../Controllers/authControllers');
const { requireAuth } = require("../middleware/authMiddleware");
const app = express();
const cors = require('cors')
app.use(cors());

    
app.post('/login',authController.loginPost);//login route 
app.post('/signup',authController.signupPost);//signup route
app.get('/login',(req, res) => {res.render('login')});
app.get('/signup',(req, res) => {res.render('signup')});
module.exports= app;