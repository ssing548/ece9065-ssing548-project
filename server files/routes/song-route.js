const express = require("express");
const router = express.Router();
const keys = require ("../config/keys");
const JWT = require("jsonwebtoken");
const passport = require('passport');
const passportConfig = require("../config/passport-setup");
const Song = require('../models/songs');
const mongoose = require("mongoose");

// signToken = user => {
//    return JWT.sign({
//        iss: 'MusicloudAPI',
//        sub: user._id,
//        iat: new Date().getTime(),
//        exp:  new Date().setDate(new Date().getDate()+1)
//    },keys.jwt.secret);
// }

router.put('/addsong',(req,res)=>{
   console.log("addsong");
   //const email = req.body.email;
   console.log(req.body.songTitle);
   var newSong = new Song({
    songId: new mongoose.Types.ObjectId(),
    songTitle: req.body.songTitle,
    artist: req.body.artist,
    album: req.body.album,
    year: req.body.year,
    comment: req.body.comment,
    genre: req.body.genre,
    submittedOn: req.body.submittedOn,
    submittedBy: req.body.submittedBy,
    numberOfRatings: req.body.numberOfRatings,
    averageRating:req.body.averageRating
   });
   
   newSong.save().then((newsong)=>{
       //res.json({user: 'created'});
       //const token = signToken(newuser);
       res.status(200).json(newSong);
   })
})


router.get("/getsongs", (req, res) => {
    Song.find().then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        });

});

// router.post('/signin',passport.authenticate('local',{session:false}),(req,res)=>{
//    console.log("signin");
//    const token = signToken(req.user);
//    res.status(200).json({token:token});

// });

// router.get('/secret',passport.authenticate('jwt',{session:false}),(req,res)=>{
//    console.log("secret");
//    res.json({secret: "resource"});

// });


module.exports = router;