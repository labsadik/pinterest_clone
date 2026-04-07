const axios = require("axios")

async function uploadToBunny(file) {
  const storageZone = process.env.BUNNY_STORAGE_ZONE
  const accessKey = process.env.BUNNY_API_KEY
  const folder = "pinterest"

  // 🔥 REMOVE SPECIAL CHARS (IMPORTANT)
  const cleanName = file.originalname.replace(/[^\w.\-]/g, "_")

  const fileName = Date.now() + "-" + cleanName

  const url = `https://storage.bunnycdn.com/${storageZone}/${folder}/${fileName}`

  await axios.put(url, file.buffer, {
    headers: {
      AccessKey: accessKey,
      "Content-Type": "application/octet-stream"
    }
  })

  return `${process.env.BUNNY_PULL_ZONE}/${folder}/${fileName}`
}

module.exports = uploadToBunny