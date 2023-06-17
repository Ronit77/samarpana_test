const dotenv = require("dotenv");
dotenv.config();
const AWS = require("@aws-sdk/client-s3");

const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccesskey = process.env.SECRET_ACCESS_KEY;

const s3 = new AWS.S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccesskey,
  },
  region: bucketRegion,
});

module.exports = s3;
