const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const userRoutes = require("../reachout/routes/userRoutes");
const chatroom = require("../reachout/routes/chatroom");
const message = require("../reachout/routes/message");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

require('dotenv').config();
require('../reachout/config/database')

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;

// const server = app.listen(
//   PORT,
//   console.log(`Server running on PORT ${PORT}...`.yellow.bold)
// );

//Set up Routes

// app.get('/', (req,res)=>{
//   res.send("API is Running");
// });
app.use(cookieParser());
app.use(express.json);
app.use(logger('dev'));
app.use('/api/user', userRoutes);
app.use("/api/chat", chatroom);
app.use('api/message', message)

// error routes for user not found

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(cors());
app.use(express.json());

//Mongoose DB connection

// mongoose.connect(process.env.DATABASE_URL, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
//  });

//  const db = mongoose.connection;
	
//  db.on('connected', function() {
//    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
//  });
 

// deployment

// const __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

//Socket Io connection

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});


