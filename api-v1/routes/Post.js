const router = require("express").Router()
const multer = require("multer")

const Post = require("../models/Post")
const auth = require("../middleware/auth")
const uploadToBunny = require("../utils/bunny")

const storage = multer.memoryStorage()
const upload = multer({ storage })

// Upload
router.post("/upload", auth, upload.single("file"), async (req,res)=>{
  try{
    const fileUrl = await uploadToBunny(req.file)

    const post = await Post.create({
      title: req.body.title,
      fileUrl,
      type: req.file.mimetype.startsWith("video") ? "video":"image",
      userId: req.user.id
    })

    res.json(post)

  }catch(err){
    console.log(err)
    res.status(500).json("Upload failed")
  }
})

// Get posts
router.get("/all", async (req,res)=>{
  const page = parseInt(req.query.page) || 1

  const posts = await Post.find()
    .sort({createdAt:-1})
    .skip((page-1)*10)
    .limit(10)

  res.json(posts)
})

module.exports = router