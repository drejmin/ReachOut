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

//socket.io
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const PORT = 3001;

//Google Oauth

require('dotenv').config();
require('./client/config/database');
require('./client/config/passport');

// view engine setup
app.set('app', path.join(__dirname, 'app'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
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

  module.exports = app;