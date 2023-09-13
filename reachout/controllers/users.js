const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
    create,
    login,
    show:getAllUsers,
    show: getUser
    
};

async function getAllUsers(req, res){
  const maxResults = 10;
  let users = [];

  try {
    const userFiles = await auth.listUsers(maxResults);

    userFiles.users.forEach((user) => {
      const { uid, email, displayName, photoURL } = user;
      users.push({ uid, email, displayName, photoURL });
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

async function getUser(req, res){
  try {
    const userFile = await auth.getUser(req.params.userId);
    const { uid, email, displayName, photoURL } = userFile;

    res.status(200).json({ uid, email, displayName, photoURL });
  } catch (error) {
    console.log(error);
  }
};
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
    }
  }

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}