const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

// Signup
router.post("/signup", async (req,res)=>{
  const {username,email,password} = req.body

  const hash = await bcrypt.hash(password,10)

  const user = await User.create({
    username,
    email,
    password: hash
  })

  res.json(user)
})

// Login
router.post("/login", async (req,res)=>{
  const {email,password} = req.body

  const user = await User.findOne({email})
  if(!user) return res.status(400).json("User not found")

  const match = await bcrypt.compare(password,user.password)
  if(!match) return res.status(400).json("Wrong password")

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

  res.json({token})
})

module.exports = router