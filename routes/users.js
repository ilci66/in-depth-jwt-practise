const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');
//for most of the hashing and stuff I would normally use bcrypt module but learning 
//something else is always good


// TODO
router.get('/protected', (req, res, next) => {
});

// TODO
router.post('/login', function(req, res, next){});

router.post('/register', function(req, res, next){
  console.log("made req", req.body)

  console.log("req.body.password", req.body.password, req.body.username)
  const saltHash = utils.genPassword(req.body.password);
  console.log("password register>>>>", password )
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt
  });
  try {
    newUser.save()
      .then((user) => {

        //
        const jwt = utils.issueJWT(user) 

        //returning a success message as well as the user, more useful than just returning the user
        //the jwt will be issued here, jwt will be created in the utils
        //I took care of the utils and imported the function to issue my jwt from utils above these lines
        res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires});
        //now after successful registry frontend client will recieve this
      });
  } catch (err) {
    res.json({ success: false, msg: err });
  }

});

module.exports = router;