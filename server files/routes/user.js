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
        },
        role:"non-admin",
        status:"activated"
        
    });
    newUser.save().then((newuser)=>{
        //res.json({user: 'created'});
        const token = signToken(newuser);
        res.status(200).json({token:token});
    }).catch(err=>{
        res.json({ message: err });
    })
});


router.post('/signin',passport.authenticate('local',{session:false}),(req,res)=>{
    console.log("signin");
    const token = signToken(req.user);
    res.status(200).json({token:token,user:req.user});

});

router.get('/secret',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log("secret");
    res.json({secret: "resource"});

});


router.get('/getusers',passport.authenticate('jwt',{session:false}),(req,res)=>{
    User.find().then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        });


});

router.post('/user/changeStatus',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log("changevisibility");
    //const email = req.body.email;
    //console.log(req.body.songTitle);
  

    User.findByIdAndUpdate(req.body.user.userId,{$set:{
        
        status: req.body.status    
    }}).then(()=>{
        //res.json({user: 'created'});
        //const token = signToken(newuser);
        res.status(200).send();
    })
   
 });

 router.post('/user/changeRole',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log("changeRole");
    //const email = req.body.email;
    //console.log(req.body.songTitle);
  

    User.findByIdAndUpdate(req.body.user.userId,{$set:{
        
        role: req.body.role    
    }}).then(()=>{
        //res.json({user: 'created'});
        //const token = signToken(newuser);
        res.status(200).send();
    })
   
 });

router.post('/oauth/google',passport.authenticate('googleToken',{session:false}),(req,res)=>{
    // console.log("signin");
     const token = signToken(req.user);
   
     res.status(200).json({token:token});

});


router.post('/oauth/facebook',passport.authenticate('facebookToken',{session:false}),(req,res,next)=>{
    // console.log("signin");
     const token = signToken(req.user);
     console.log("token is "  + token);
     res.status(200).json({token:token,user:req.user});

});
module.exports = router;