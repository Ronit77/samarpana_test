const sequelize = require("./Database/index");
/* Script for creation of tables */
const User = require("./Models/User");
const Temple = require("./Models/Temple");
const Event = require("./Models/Event");
const Seva = require("./Models/Seva");
const MediaPost = require("./Models/MediaPost");
const PostComment = require("./Models/PostComment");
const EventUserRegistration = require("./Models/EventUserRegistration");
const SevaUserRegistration = require("./Models/SevaUserRegistration");
//const SevaTracker = require("./Models/SevaTracker");
const TempleLiveStream = require("./Models/TempleLiveStream");
const BhajanSongs = require("./Models/BhajanSong");
const BhajanTvStream = require("./Models/BhajanTvStream");

/* One temple can have many media posts */
Temple.hasMany(MediaPost,{
  foreignKey: "templeId",
});
MediaPost.belongsTo(Temple, {foreignKey: "templeId"});

/* One post can have multiple comments*/
MediaPost.hasMany(PostComment,{foreignKey: "postId"});
User.hasMany(PostComment,{foreignKey: "postId"});


/* One temple can have many events */
Temple.hasMany(Event, {
  foreignKey: "templeId",
});
Event.belongsTo(Temple, { foreignKey: "templeId" });

/* One temple can have many sevas */
Temple.hasMany(Seva, {
  foreignKey: "templeId",
});
Seva.belongsTo(Temple, { foreignKey: "templeId" });

/*
One event can have many users
one user can have many events 
 */
Event.belongsToMany(User, { through: EventUserRegistration });
User.belongsToMany(Event, { through: EventUserRegistration });

/*
One seva can have many users
one user can have many seva 
 */
Seva.belongsToMany(User, { through: SevaUserRegistration });
User.belongsToMany(Seva, { through: SevaUserRegistration });
// SevaUserRegistration.hasOne(SevaTracker, {
//   foreignKey: "id",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",});

/* One Temple has one live_stream */
Temple.hasOne(TempleLiveStream, {
  foreignKey: "temple_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
TempleLiveStream.belongsTo(Temple);

/* One temple can have many media posts */
Temple.hasMany(MediaPost, {
  foreignKey: "templeId",
});
MediaPost.belongsTo(Temple, { foreignKey: "templeId" });

/* User can comment on a post */
User.belongsToMany(MediaPost, { through: PostComment });
MediaPost.belongsToMany(User, { through: PostComment });

sequelize.sync({ alter: true }).then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log("Error" + err);
  }
);
