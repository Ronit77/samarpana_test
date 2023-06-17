const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Database/index");
const User = require("./User");
const MediaPost = require("./MediaPost");

const PostComment = sequelize.define(
  "PostComment",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    media_post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: MediaPost,
        key: "id",
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = PostComment;
