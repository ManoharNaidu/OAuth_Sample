const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const passportConfig = require('./passport/passport');
const passport = require('passport');
const session = require('express-session');
const app = express();

mongoose.connect("mongodb://localhost:27017/OAuth_Passport")
.then(() => { console.log("Connected to MongoDB")})


app.use(session({
  secret: 'Manu',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/auth", auth);

const isLoggedIn = (req,res,next) => {
    if(!req.user) return res.redirect("/auth/login");
    next();

}


app.set("view engine", "ejs");
app.engine('ejs', require('ejs').__express);

app.get("/", isLoggedIn, (req,res) => {
    res.render("home");
})

app.listen(4000, () => { console.log("Server at 4000");})