// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http');

//socket.io
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const PORT = 3001;
//Google Oauth
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

require('./config/database');
require('dotenv').config();
require('./config/passport');

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  }));
  
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
  });
  

// initialize mongoose mongo.db express

mongoose.connect('mongodb://localhost:27017/myMernDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
// initialize socket.io

io.on("connection", (socket) => {
    global.chatSocket = socket;
  
    socket.on("addUser", (userId) => {
      onlineUsers.set(userId, socket.id);
      socket.emit("getUsers", Array.from(onlineUsers));
    });
  
    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
      const sendUserSocket = onlineUsers.get(receiverId);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("getMessage", {
          senderId,
          message,
        });
      }
    });
  
    socket.on("disconnect", () => {
      onlineUsers.delete(getKey(onlineUsers, socket.id));
      socket.emit("getUsers", Array.from(onlineUsers));
    });
  });

// initialize Google Oauth
// Initialize session
app.use(session({
    secret: 'some-secret',
    resave: false,
    saveUninitialized: true,
  }));
  
  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  
  passport.use(new GoogleStrategy({
    clientID: '941626234497-d8j72o6uhmvk54b19ssb5j3757mf30js.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }));

  // Redirect to Google for OAuth login
app.get('/auth/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
);

// The callback after Google has authenticated the user
app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/' }),
(req, res) => {
  res.redirect('/');
}
);
