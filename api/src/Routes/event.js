const express = require("express");
const router = express.Router();
const Event = require("../Models/Event");
const EventUserRegistration = require("../Models/EventUserRegistration");
const User = require("../Models/User");
const { verifyAccessToken } = require("../Utils/jwt_util");

router.post("/:eventId/register", verifyAccessToken, async (req, res) => {
  const { eventId } = req.params;
  const user_details = req.user;
  if (!eventId) {
    const data = {
      success: false,
      message: "Event id is not provided",
    };
    res.status(400).json(data);
    return;
  }

  const { name, phone_number } = req.body;

  if (!name || !phone_number) {
    const data = {
      success: false,
      message: "please provide all of the data",
    };
    res.status(400).json(data);
    return;
  }

  const event = await Event.findByPk(eventId);

  if (!event) {
    const data = {
      success: false,
      message: "Event with given id is not found",
    };
    res.status(404).json(data);
    return;
  }

  const user = await User.findOne({
    where: { username: user_details["username"] },
  });
  let event_registration;
  try {
    event_registration = await EventUserRegistration.create({
      event_id: event.id,
      user_id: user.id,
      name: name,
      phone_number: phone_number,
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
    message: "registered for event",
    data: event_registration.get({ plain: true }),
  };
  res.status(200).json(data);
  return;
});

module.exports = router;
