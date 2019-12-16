const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const JWT = require("jsonwebtoken");
const passport = require('passport');
const passportConfig = require("../config/passport-setup");
const Song = require('../models/songs');
const mongoose = require("mongoose");


/*Route to add new Song */
router.put('/auth/addsong', passport.authenticate('jwt', { session: false }), (req, res) => {


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
        averageRating: req.body.averageRating,
        visibility: req.body.visibility
    });

    newSong.save().then((newsong) => {

        res.status(200).json(newSong);
    })
})

/*Route to get all Songs with true visibility */
router.get("/getsongs", (req, res) => {
    Song.find({ visibility: "true" }).then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        });

});

/*Route to get all Songs for Admin*/
router.get("/auth/songsForAdmin", passport.authenticate('jwt', { session: false }), (req, res) => {
    Song.find().then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        });

});

/*Route to add change visibility of Song */
router.post('/auth/changevisibility', passport.authenticate('jwt', { session: false }), (req, res) => {

    Song.update({ 'songId': req.body.songId }, {
        $set: {

            visibility: req.body.visibility

        }
    }).then(() => {

        res.status(200).send();
    })
});

/*Route to delete Song */
router.delete("/auth/deleteSong", passport.authenticate('jwt', { session: false }), (req, res) => {


    Song.deleteOne({ songId: req.body.songId })
        .then(data => {
            if (data)
                res.status(200).send();
            else
                res.status(404).send();
        })
        .catch(err => {

            res.json({ message: err });
        });
});




module.exports = router;