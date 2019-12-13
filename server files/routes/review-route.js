const express = require("express");
const router = express.Router();
const keys = require ("../config/keys");
const JWT = require("jsonwebtoken");
const passport = require('passport');
const passportConfig = require("../config/passport-setup");
const Review = require('../models/review');
const mongoose = require("mongoose");

router.put('/auth/addreview',passport.authenticate('jwt',{session:false}),(req,res)=>{
   console.log("addreview");
   //const email = req.body.email;
   //console.log(req.body.songTitle);
   var newReview = new Review({
    reviewId: new mongoose.Types.ObjectId(),
    songId: req.body.songId,
    submittedOn: req.body.submittedOn,
    submitedBy: req.body.submitedBy,
    reviewDesc: req.body.reviewDesc,
    rating: req.body.rating,
    visibility: req.body.visibility,
   });
   
   newReview.save().then((newreview)=>{
       //res.json({user: 'created'});
       //const token = signToken(newuser);
       res.status(200).json(newreview);
   })
})


router.get("/getreviews", (req, res) => {
    Review.find().then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        });

});




module.exports = router;