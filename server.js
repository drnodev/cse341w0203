const env = require("dotenv").config()
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const GitHubStrategy = require('passport-github2').Strategy;


const app = express();
const port = process.env.PORT || 3000;

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(express.json())
  .use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  })
  .use(cors({ methods: "*", allowedHeaders: "*" }))
  .use(cors({ origin: "*" }))


process.on('uncaughtException', (err, origin) => {
  console.log('Caught exception: ', err, origin);
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : `Not logged in`);
})

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false
}), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`app listening on ${port}`)
  mongodb.initDb()
})
