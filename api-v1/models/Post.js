const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  title: String,
  fileUrl: String,
  type: String,
  userId: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Post", postSchema)