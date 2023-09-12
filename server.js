// server.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
var passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const cors = require('cors');
// const favicon = require('serve-favicon');

// // Configure both serve-favicon & static middleware
// // to serve from the production 'build' folder
// app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
// app.use(express.static(path.join(__dirname, 'client')));

const port = process.env.PORT || 3001;


//Google Oauth

require('dotenv').config();
require('./client/config/database');
require('./client/config/passport');

// view engine setup
app.set('app', path.join(__dirname, 'app'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
// app.use(VerifyToken);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

app.listen(port, function(){
  console.log(`Server is running on port ${port}`);
});

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// app.listen(port, function() {
//   console.log(`Express app running on port ${port}`);
// });


//socket.io
const server = http.createServer(app);
const {Server} = require("socket.io");
// const PORT = 3001;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// io.use(VerifySocketToken);

global.onlineUsers = new Map();

const getKey = (map, val) => {
  for (let [key, value] of map.entries()) {
    if (value === val) return key;
  }
};


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

  module.exports = app;