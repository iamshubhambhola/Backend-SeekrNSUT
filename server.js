const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app =express();
const session = require('express-session');
const passport = require('passport');
const User = require('./models/user');

const sessionConfig = {
  secret: 'helloworld',
  resave: false,
  saveUninitialized: false,
}
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

const GitHubStrategy = require('passport-github2').Strategy;

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname , 'views'));
 
app.get('/', (req, res) => {
    res.send("hello")
})

app.get('/login', (req, res) => { 
    res.render('login');
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});

// ********* Github Login : Start **********
//TODO: Create a .env file and add the client id and client secret
GITHUB_CLIENT_ID = 'cf1f1c2dbb2c78abba43';
GITHUB_CLIENT_SECRET = 'a89f217878d8d2180aa792608b5aae891fae677a';
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  //BUG findOrCreate requires required fields.
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

// ********* GITHUB LOGIN : END **********

const db = require('./config/keys').mongoURI;
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
//const bodyParser= require('body-parser');
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json({ extended: false }));


app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));



const connectDB = async () => {
    try { await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }); console.log('mongodb connected...'); } catch (err) {
        console.log(err.message); //exit process 1 
        process.exit(1);
    }
}
connectDB();


app.get('/', (req, res) => {
    res.send("hello")
})

app.listen(port, function (err) {
    if (err) {
        console.log('error!');
    }
    console.log(`yups! expreess server is running on port http://localhost:${port} : `, port);
})