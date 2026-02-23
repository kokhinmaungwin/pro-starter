const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

// register
router.post("/register", async (req,res)=>{
  const {email,password} = req.body;

  const hash = await bcrypt.hash(password,10);
  await User.create({email,password:hash});

  res.json("Registered");
});

// login
router.post("/login", async (req,res)=>{
  const {email,password} = req.body;

  const user = await User.findOne({email});
  if(!user) return res.status(400).json("User not found");

  const valid = await bcrypt.compare(password,user.password);
  if(!valid) return res.status(400).json("Wrong password");

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
  res.json({token});
});

// protected
router.get("/profile", auth, (req,res)=>{
  res.json("Protected profile data");
});

module.exports = router;
