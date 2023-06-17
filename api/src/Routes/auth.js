const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const jwtUtil = require("../Utils/jwt_util");
const upload = require("../Utils/multer_util");
const uuid = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

const {
  uploadFileToS3,
  generateSignedUrlOfFile,
} = require("../Utils/s3_file_util");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const data = {
      success: false,
      message: "Invalid request body provided",
    };
    res.status(400).json(data);
    return;
  } else {
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      const data = {
        success: false,
        message: "Invalid username",
      };
      res.status(401).json(data);
      return;
    }

    const password_matched = await bcrypt.compare(password, user.password);

    if (!password_matched) {
      const data = {
        success: false,
        message: "Invalid password.",
      };
      res.status(401).json(data);
      return;
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = jwtUtil.generateAccessToken(payload);
    const data = {
      success: true,
      message: "User authentication successful",
      data: {
        token: token,
        username: user.username,
      },
    };
    res.status(200).json(data);
  }
});

router.post("/register", async (req, res) => {
  const { username, password, phone_no } = req.body;

  if (!username || !password || !phone_no) {
    const data = {
      success: false,
      message: "Invalid request body provided",
    };
    res.status(400).json(data);
  }

  let user = await User.findOne({ where: { username: username } });

  if (user && user.username) {
    const data = {
      success: false,
      message: "username already exists.",
    };
    res.status(400).json(data);
    return;
  }

  try {
    user = await User.create({
      username: username,
      password: password,
      phone_no: phone_no,
      avatar_url: "dummy-url",
    });
  } catch (err) {
    res.status(500).send(String(err));
    return;
  }

  const data = {
    success: true,
    message: "user created",
    data: {
      username: username,
      phone_no: phone_no,
    },
  };

  res.status(200).json(data);
});

router.put(
  "/me/edit",
  jwtUtil.verifyAccessToken,
  upload.single("document"),
  async (req, res) => {
    const username = req.user.username;
    const user = await User.findOne({
      where: { username: username },
    });
    if (!user) {
      const data = {
        success: false,
        message: "Username not found",
      };
      res.status(404).json(data);
      return;
    }
    const bucketName = await process.env.BUCKET_NAME;
    const unique_id = uuid.v4();
    let uploadPath = `${process.env.FILE_UPLOAD_PATH_USERS}${req.user.username}/${unique_id}_${req.file.originalname}`;
    const upload_res = await uploadFileToS3(bucketName, req.file, uploadPath);

    user.avatar_file_path = uploadPath;
    user.religion = req.body.religion;
    user.phone_no = req.body.phone_no;

    try {
      user.save();
    } catch (err) {
      res.status(500).json({ success: false, message: String(e) });
    }

    const data = {
      success: true,
      message: `Updated the data for user ${user.username}`,
    };

    res.status(200).json(data);
  }
);

router.get("/me", jwtUtil.verifyAccessToken, async (req, res) => {
  if (!req.user) {
    const data = { success: false, message: "jwt is not valid for user" };
    res.status(400).json(data);
    return;
  }

  const { username } = req.user;

  let user;
  try {
    user = await User.findOne({ where: { username: username } });
  } catch (err) {
    res.status(500).end();
  }
  const bucketName = process.env.BUCKET_NAME;
  let url;
  try {
    url = await generateSignedUrlOfFile(bucketName, user.avatar_file_path);
  } catch (err) {
    res.status(500).send("Error while generating signed url");
  }

  let user_obj = {
    username: user.username,
    fullname: user.fullname,
    religion: user.religion,
    phone: user.phone_no,
    avatar_url: url,
  };

  res.status(200).json({ success: true, data: user_obj });
});

module.exports = router;
