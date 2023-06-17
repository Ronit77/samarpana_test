const express = require("express");
const router = express.Router();

const Temple = require("../Models/Temple");
const jwtUtil = require("../Utils/jwt_util");

router.get("/", jwtUtil.verifyAccessToken, async (req, res) => {
  const { name, deity_name, religion, region } = req.query;

  let whereClause = {};

  if (name) {
    whereClause.name = name;
  }

  if (deity_name) {
    whereClause.deity_name = deity_name;
  }
  if (religion) {
    whereClause.religion = religion;
  }
  if (region) {
    whereClause.region = region;
  }

  let temples;

  try {
    temples = await Temple.findAll({ where: whereClause });
  } catch (error) {
    console.log(error, "error");
    res.status(500).send("Error while reading temples");
    return;
  }

  const data = {
    success: true,
    data: temples,
  };

  res.status(200).json(data);
});

module.exports = router;
