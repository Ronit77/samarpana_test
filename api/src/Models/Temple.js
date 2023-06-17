const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Database/index");

const Temple = sequelize.define(
  "Temple",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    deity_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    religion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    region: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    banner_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certificate_issuing: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Temple;
