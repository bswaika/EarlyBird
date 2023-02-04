const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secret = process.env.JWT_SECRET

exports.signup = async (req, res, next) => {
    const {name, email, passwordHash} = req.body;
    const user = await User.findOne({email: emai});
    if(user){
        res.status(400);
        return res.json({
            message: 'Email already exists!'
        });
    }
    const hash = await bcrypt.hash(passwordHash);
    req.body.token = jwt.sign({email}, secret, {
        expiresIn: '7d'
    });
    req.body.passwordHash = hash;
    next();    
}