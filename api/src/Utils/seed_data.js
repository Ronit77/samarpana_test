const csv = require("csvtojson");

const User = require("../Models/User");
const Temple = require("../Models/Temple");
const Event = require("../Models/Event");
const Seva = require("../Models/Seva");
const path = require("path");

const seedUsers = async () => {
  const users_csv = path.join(
    __dirname,
    "..",
    "..",
    "/resources/mockdata/users.csv"
  );
  console.log("Loading users");
  const users = await csv().fromFile(users_csv);
  console.log("Insertion");
  await User.bulkCreate(users);
  console.log("Created...");
};

const seedTemples = async () => {
  const temples_csv = path.join(
    __dirname,
    "..",
    "..",
    "/resources/mockdata/temples.csv"
  );

  console.log("Loading temples");
  const temples = await csv().fromFile(temples_csv);
  console.log(temples);
  console.log("Insertion temples");
  await Temple.bulkCreate(temples);
  //   console.log("Created... temples");
};

const seedEvents = async () => {
  const events_csv = path.join(
    __dirname,
    "..",
    "..",
    "/resources/mockdata/events.csv"
  );

  console.log("Loading events");
  const events = await csv().fromFile(events_csv);
  console.log(events);
  console.log("Insertion");
  await Event.bulkCreate(events);
  console.log("Created...");
};

const seedSevas = async () => {
  const sevas_csv = path.join(
    __dirname,
    "..",
    "..",
    "/resources/mockdata/sevas.csv"
  );

  console.log("Loading events");
  const sevas = await csv().fromFile(sevas_csv);
  console.log("Insertion");
  await Seva.bulkCreate(sevas);
  console.log("Created...");
};

const seedDatabase = async () => {
  seedUsers();
  seedTemples();
  seedEvents();
  seedSevas();
};

seedDatabase();
