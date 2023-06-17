const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("./s3_util");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const uploadFileToS3 = async (bucketName, file, uploadPath) => {
  console.log(file, "file");
  const commandProps = {
    Bucket: bucketName,
    Key: uploadPath,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const uploadFileCommand = new PutObjectCommand(commandProps);
  let data;
  try {
    data = await s3.send(uploadFileCommand);
  } catch (error) {
    console.log(error);
  }
  return data;
};

const generateSignedUrlOfFile = async (bucketName, s3FilePath) => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: s3FilePath,
  };

  let getFileCommand;
  let signedUrl = "";
  try {
    getFileCommand = new GetObjectCommand(getObjectParams);
    signedUrl = await getSignedUrl(s3, getFileCommand, { expiresIn: 604800 });
  } catch (err) {
    console.log(err);
  }

  return signedUrl;
};

module.exports = {
  uploadFileToS3,
  generateSignedUrlOfFile,
};
