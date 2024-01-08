const jwt = require('jsonwebtoken');
const User = require("../../models/user");
const bcrypt = require('bcrypt');

module.exports = {
  create,
  login,
  checkToken,
  getAllUsers,
};

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

async function login(req, res){
  try{
    const user = await User.findOne({email:req.body.email});
    console.log('logging in');

    if (!user) throw new Error();

    const match = await bcrypt.compare(req.body.password, user.password);
    console.log('logging in');

    if (!match) throw new Error();

    res.json(createJWT(user));
  }catch{
    res.status(400).json('Bad Credentials');
    }
  }


  async function create(req, res) {
    try {
      // Add the user to the database
      const user = await User.create(req.body);
      // token will be a string
      const token = createJWT(user);
      // Yes, we can use res.json to send back just a string
      // The client code needs to take this into consideration
      res.json(token);
    } catch (err) {
      // Client will check for non-2xx status code 
      // 400 = Bad Request
      res.status(400).json(err);
      throw new Error('Bad Request')
    }
    const userExists = await User.findOne({email:req.body.email});

    if (userExists){
      res.status(400);
      throw new Error("User already Exists");
    }
  }

  function checkToken(req,res){
    //req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
  }

  async function getAllUsers(req,res) {
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
  }

// const authUser = asyncHandler(async (req,res) =>{
//   const {email,password} = req.body;

//   const user = await User.findOne({email});

//   if (user && (await user.matchPassword(password))){
//     res.json({
//       _id:user._id,
//       name: user.name,
//       email: user.email,
//       avatar: user.avatar,
//       token: createToken(user._id),
//     });
//   }else {
//     res.status(401);
//     throw new Error("Invalid Email or Password");
//   }
// })
