const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Passport 
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Routes
const rooms = require('./routes/rooms'); // import the rooms routes
const history = require('./routes/history'); // import the history routes
const onlineUsers = require('./routes/onlineUsers'); // import the onlineUsers routes
const activityLog = require('./routes/activityLog');
const schedule = require('./routes/schedule');


const cors = require('cors');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://icetclass:Seta5b1pa55@15.156.204.35:27017/')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));

// Bodyparser Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Passport middleware
app.use(passport.initialize());

// Passport config
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret'; // Use own secret

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(err => console.log(err));
}));

// Use Routes
app.use('/api/rooms', rooms); // use the rooms routes for requests to /api/rooms
app.use('/api/history', history); // use the history routes for requests to /api/history
app.use('/api/onlineUsers', onlineUsers); // use the onlineUsers routes for requests to /api/onlineUsers
app.use('/api/activityLog', activityLog);
app.use('/api/schedule', schedule);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));