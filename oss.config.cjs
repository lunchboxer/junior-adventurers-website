require('dotenv').config()

let bucket = process.env.OSS_BUCKET
if (process.env.STAGE === 'production') bucket = process.env.OSS_BUCKET_PROD

module.exports = {
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  region: process.env.OSS_REGION,
  bucket,
}
