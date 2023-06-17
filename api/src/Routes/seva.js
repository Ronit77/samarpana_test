const express = require("express");
const router = express.Router();
const Seva = require("../Models/Seva");
const SevaUserRegistration = require("../Models/SevaUserRegistration");
const User = require("../Models/User");
const { verifyAccessToken } = require("../Utils/jwt_util");

router.post("/:sevaId/register", verifyAccessToken, async (req, res) => {
  const { sevaId } = req.params;
  const user_details = req.user;
  if (!sevaId) {
    const data = {
      success: false,
      message: "seva id is not provided",
    };
    res.status(400).json(data);
    return;
  }

  const { name, phone_number, amount, cert_needed } = req.body;

  if (!name || !phone_number || !amount) {
    const data = {
      success: false,
      message: "please provide all of the data",
    };
    res.status(400).json(data);
    return;
  }

  const seva = await Seva.findByPk(sevaId);

  if (!seva) {
    const data = {
      success: false,
      message: "Seva with given id is not found",
    };
    res.status(404).json(data);
    return;
  }

  const user = await User.findOne({
    where: { username: user_details["username"] },
  });
  let seva_registration;
  try {
    seva_registration = await SevaUserRegistration.create({
      seva_id: seva.id,
      user_id: user.id,
      name: name,
      phone_number: phone_number,
      amount: amount,
      "80G_certificate_needed": cert_needed,
    });
  } catch (err) {
    const data = {
      success: false,
      message: String(err),
    };
    res.status(500).json(data);
    return;
  }
  const data = {
    success: true,
    message: "registered for seva",
    data: seva_registration.get({ plain: true }),
  };
  res.status(200).json(data);
  return;
});

module.exports = router;
