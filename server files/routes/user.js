 const express = require("express");
 const router = express.Router();
 const {validateBody,schemas} = require("../helpers/routeHelpers");
 const User = require("../models/user");
 const keys = require ("../config/keys");
 const JWT = require("jsonwebtoken");
 const passport = require('passport');
 const passportConfig = require("../config/passport-setup");
// const UserController = require("../controllers/users");



// router.get('/google',passport.authenticate('google',{
//     scope: ['profile']
// }));

// router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
//     res.send(req.user);
// });

signToken = user => {
    return JWT.sign({
        iss: 'MusicloudAPI',
        sub: user._id,
        iat: new Date().getTime(),
        exp:  new Date().setDate(new Date().getDate()+1)
    },keys.jwt.secret);
}

router.post('/signup',(req,res)=>{
    console.log("signup");
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
        method:"local",
        local:{
        email:email,
        password:password
        }
        
    });
    newUser.save().then((newuser)=>{
        //res.json({user: 'created'});
        const token = signToken(newuser);
        res.status(200).json({token:token});
    })
})


router.post('/signin',passport.authenticate('local',{session:false}),(req,res)=>{
    console.log("signin");
    const token = signToken(req.user);
    res.status(200).json({token:token});

});

router.get('/secret',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log("secret");
    res.json({secret: "resource"});

});

router.post('/oauth/google',passport.authenticate('googleToken',{session:false}),(req,res)=>{
    // console.log("signin");
     const token = signToken(req.user);
     res.status(200).json({token:token});

});


router.post('/oauth/facebook',passport.authenticate('facebookToken',{session:false},{scope:['profile']}),(req,res)=>{
    // console.log("signin");
    // const token = signToken(req.user);
    // res.status(200).json({token:token});

});
module.exports = router;