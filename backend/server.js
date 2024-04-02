const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

// Passport 
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Routes
const onlineUsers = require('./routes/onlineUsers'); // import the onlineUsers routes
const activityLog = require('./routes/activityLog');
const schedule = require('./routes/schedule');
const checksheet = require('./routes/checksheet');
const checkpoint = require('./routes/checkpoint');

const cors = require('cors');
const app = express();
const server = http.createServer(app);

// Connect to MongoDB
mongoose.connect('mongodb://icetclass:Seta5b1pa55@15.156.204.35:27017/')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
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
app.use('/api/onlineUsers', onlineUsers); // use the onlineUsers routes for requests to /api/onlineUsers
app.use('/api/activityLog', activityLog);
app.use('/api/schedule', schedule);
app.use('/api/checksheet', checksheet);
app.use('/api/checkpoint', checkpoint);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('userLoggedIn', (user) => {
    console.log('User logged in:', user);
    io.emit('refreshDashboards')
  });

  socket.on('userLoggedOut', (user) => {
    console.log('User logged out:', user);
    io.emit('refreshDashboards')
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server started on port ${port}`));