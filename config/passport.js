const fs = require('fs');
const path = require('path');
const User = require('mongoose').model('User');
const JwtStrategy = require('passport-jwt').Strategy;
//this will give me options on extracting jwt from the the http header
const ExtractJwt = require('passport-jwt').ExtractJwt; 


const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
//to implement this jwt strategy
const options = {
  // there are other options such as fromBodyField(field_name) and fromUrlQueryParameter(param_name)
  //for this one going with this one
  // it will expect jwt to be: Autharization: Bearer <token> (space is important)
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //generated the public key with the same algorithm
  //as we are in the verify section of the process I need to use the public key 
  //issuance will be done with the private key
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

const strategy = new JwtStrategy(options, (payload, done) => {
  //the user id will be in the subfield (payload.sub), I will issue a jwt and place it there when 
  //a user logs in or registers 
  //Don't forget at this point the jwt is verified and valid
  User.findOne({_id: payload.sub})
    .then((user) => {
      if(user) {
        //so when I find the user, I return it to passport so it can attach it to the request object
        return done(null, user);
      }else{
        return done(null, false);
      }
    })
    .catch(error => done(error, null)) 
});
//now write a login route that issues a new jwt using the private key so the server can use the public 
//key to verify, to do routes I go :)



//the passport object in the argument section, is provided by the app.js
module.exports = (passport) => {

  passport.use(strategy)
}