const User = require("../DB/modal/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signupUser = async (req, res) => {
  try {
    const { name, userName, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const userExist = await User.findOne({ userName: userName });
    if (userExist) {
      return res.status(422).send("User already exist");
    } else {
      const newUser = new User({ name, userName, password: hashedpassword });
      await newUser.save();
      return res.status(200).send("user Saved successfully");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("error occured");
  }
};
module.exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(421).send("enter data properly");
    }
    const userNameFound = await User.findOne({ userName: userName });
    if (userNameFound) {
      let match = await bcrypt.compare(password, userNameFound.password);
      if (match) {
        const id = userNameFound._id.toString();
        const token = jwt.sign({ id }, process.env.SECRETKEY, {
          expiresIn: "1h",
        });
        return res.status(200).send({ token, msg: "login successfull" });
      } else {
        return res.status(420).send("login failed");
      }
    } else {
      return res.status(422).send("no user found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("login failed");
  }
};
module.exports.getUserDetail = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (userId) {
      const getUser = await User.findOne({ _id: userId });
      res.status(200).send({ getUser, msg: "user found" });
    }
  } catch (err) {
    console.log(err);
  }
};
