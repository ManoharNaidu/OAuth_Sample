const passport = require('passport');
const User = require('../models/user');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, next) => {
    return next(null, user.id);
  });
  
passport.deserializeUser((id, next) => {
    User.findById(id)
        .then(user => {
        return next(null, user);
        })
        .catch(error => {
        return next(error);
    });
});

passport.use( new GoogleStrategy({
    clientID : "34338768175-8n7celhjuom01k7949b0m45cjr17ruhb.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4000/auth/google/callback"
}, (accessToken, refreshToken, profile, next) => {
    // console.log(profile);
    User.findOne({email: profile._json.email})
    .then( user => {
        if (user){
            // console.log("User Already Exists", user);
           return next(null,user)
        }
        else{
            User.create({
                name : profile._json.name,
                googleId: profile.id,
                email: profile._json.email,
            }).then(user => {
                // console.log("User Created", user);
               return next(null,user)
            })
            .catch( err => {
                // console.log(err);
               return next(err,null)
            })
        }
    })
   return next()
}))