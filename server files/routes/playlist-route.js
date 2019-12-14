const express = require("express");
const router = express.Router();
const keys = require ("../config/keys");
const JWT = require("jsonwebtoken");
const passport = require('passport');
const passportConfig = require("../config/passport-setup");
const Playlist = require('../models/playlist');
const mongoose = require("mongoose");



router.put('/auth/addplaylist',passport.authenticate('jwt',{session:false}),(req,res)=>{
   console.log("addplaylist");
   //const email = req.body.email;
   //console.log(req.body.songTitle);
   var newPlaylist = new Playlist({
    listId: new mongoose.Types.ObjectId(),
    listTitle: req.body.listTitle,
    listDesc: req.body.listDesc,
    createdOn: req.body.createdOn,
    createdBy: req.body.createdBy,
    visibility: req.body.visibility,
    songs: req.body.songs
   });
   
   newPlaylist.save().then((newplaylist)=>{
       //res.json({user: 'created'});
       //const token = signToken(newuser);
       res.status(200).json(newplaylist);
   })
})


router.post('/auth/editplaylist',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log("editplaylist");
    //const email = req.body.email;
    //console.log(req.body.songTitle);
    Playlist.update({'listId':req.body.listId},{$set:{
        listTitle: req.body.listTitle,
        listDesc: req.body.listDesc,
        createdOn: req.body.createdOn,
        createdBy: req.body.createdBy,
        visibility: req.body.visibility,
        songs: req.body.songs
    }}).then(()=>{
        //res.json({user: 'created'});
        //const token = signToken(newuser);
        res.status(200).send();
    })
 })
 

 router.post('/auth/changevisibility',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log("changevisibility");
    //const email = req.body.email;
    //console.log(req.body.songTitle);
    Playlist.update({'listId':req.body.playlistId},{$set:{
        
        visibility: req.body.visibility
       
    }}).then(()=>{
        //res.json({user: 'created'});
        //const token = signToken(newuser);
        res.status(200).send();
    })
 })
 
router.get("/getplaylists", (req, res) => {
    Playlist.find({visibility: "true"}).then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        });

});

router.get("/auth/getplaylists", passport.authenticate('jwt',{session:false}),(req, res) => {
    Playlist.find().then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        });

});




module.exports = router;