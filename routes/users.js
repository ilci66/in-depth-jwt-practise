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
  const saltHash = utils.genPassword(req.body.password);
  
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
        //returning a success message as well as the user, more useful than just returning the user
        //the jwt will be issued here, jwt will be created in the utils
        res.json({ success: true, user: user });
      });
  } catch (err) {
    res.json({ success: false, msg: err });
  }

});

module.exports = router;