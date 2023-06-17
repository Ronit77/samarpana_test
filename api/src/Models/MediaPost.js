const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Database/index");
//const Temple = require("./Temple");

const MediaPost = sequelize.define(
  "MediaPost",
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    post_file_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = MediaPost;
