//this middlware is used to prevent users who didnt login from checking our content
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const requireAuth = (req, res, next) => {
    let token = req.headers.cookie;
    //if this token exist then the user has logged in so we will check this token
    if (token && token.startsWith("GameToken")) {
        token = token.replace("GameToken=", "");
        jwt.verify(token, "Network_computing_task", (err, decodeToken) => {
            if (err) {
                res.locals.user = null;
                next();
            }
            else
            {
                User.findById(decodeToken.id, function (err, docs) {
                    if (err) {
                        res.status(400).json({msg:err}); 
                    } 
                    else {
                        res.locals.user = docs;
                        next();
                    }
                });
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }   
}
module.exports = { requireAuth };