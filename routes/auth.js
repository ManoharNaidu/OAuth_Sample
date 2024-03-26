const router = require('express').Router();
const passport = require('passport');


router.get("/login",(req,res) => {
    res.render('login');
})

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/auth/login');
    });
  });

router.get("/google", passport.authenticate("google",{scope:["profile","email"]}), (req,res) => {
    return;
})

router.get('/google/callback', (req,res,next)=>{
    passport.authenticate('google', async (error, user , info) => {
      if (error){
        return res.send({ message:error.message });
      }
      if (user){
        try {
          return res.send({
            message: "User Authenticated",
            user,
          });
        } catch (error) {
          return res.send({ message: error.message });
        }
      }
    })(req,res,next), (req,res) => {
      return;
    }
})

module.exports = router