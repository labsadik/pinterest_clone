require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/post")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

// DB
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)

// Start
app.listen(process.env.PORT, ()=>{
  console.log("Server running on", process.env.PORT)
})