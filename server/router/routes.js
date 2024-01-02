const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getUserDetail,
} = require("../controller/user_controller");
router.post("/signUp", signupUser);
router.post("/", loginUser);
router.post("/getUserDetail", getUserDetail);

module.exports = router;
