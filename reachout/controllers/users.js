const User = require('../../models/user');
const asyncHandler = require('express-async-handler');
const createToken = require("..config/createToken");

const getAllUsers = asyncHandler(async (req,res)=>{
  const keyword = req.query.search
    ?{
      $or: [
        {name: {$regex: req.query.search, $options: "i "}},
        {email: {$regex: req.query.search, $options: "i "}},
      ],
    }
    :{};

  const users = await User.find(keyword).find({_id: { $ne: req.user._id}});
  res.send(users);
})

const registerUser = asyncHandler( async (req,res)=>{
  const {name, email, password, avatar} = req.body;

  if(!name || !email || !password){
    res.status(400);
    throw new Error("Please Enter all Required Fields");
  }
  const userExists = await User.findOne({email});

  if (userExists){
    res.status(400);
    throw new Error("User already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar,

  });

  if (user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: createToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");

  }

});

const authUser = asyncHandler(async (req,res) =>{
  const {email,password} = req.body;

  const user = await User.findOne({email});

  if (user && (await user.matchPassword(password))){
    res.json({
      _id:user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: createToken(user._id),
    });
  }else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
})

module.exports = {
    registerUser,
    authUser,
    getAllUsers
    
};

// async function getAllUsers(req, res){
//   const maxResults = 10;
//   let users = [];

//   try {
//     const userFiles = await auth.listUsers(maxResults);

//     userFiles.users.forEach((user) => {
//       const { uid, email, displayName, photoURL } = user;
//       users.push({ uid, email, displayName, photoURL });
//     });
//     res.status(200).json(users);
//   } catch (error) {
//     console.log(error);
//   }
// };

// async function getUser(req, res){
//   try {
//     const userFile = await auth.getUser(req.params.userId);
//     const { uid, email, displayName, photoURL } = userFile;

//     res.status(200).json({ uid, email, displayName, photoURL });
//   } catch (error) {
//     console.log(error);
//   }
// };
// async function create(req, res) {
//     try {
//       // Add the user to the database
//       const user = await User.create(req.body);
//       // token will be a string
//       const token = createJWT(user);
//       // Yes, we can use res.json to send back just a string
//       // The client code needs to take this into consideration
//       res.json(token);
//     } catch (err) {
//       // Client will check for non-2xx status code 
//       // 400 = Bad Request
//       res.status(400).json(err);
//     }
//   }

// async function login(req, res) {
//   try {
//     const user = await User.findOne({email: req.body.email});
//     if (!user) throw new Error();
//     const match = await bcrypt.compare(req.body.password, user.password);
//     if (!match) throw new Error();
//     const token = createJWT(user);
//     res.json(token);
//   } catch (err) {
//     res.status(400).json('Bad Credentials');
//   }
// }

// /*--- Helper Functions --*/

// function createJWT(user) {
//   return jwt.sign(
//     // data payload
//     { user },
//     process.env.SECRET,
//     { expiresIn: '24h' }
//   );
// }