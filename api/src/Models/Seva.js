const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Database/index");
//const Temple = require("./Temple");

const Seva = sequelize.define(
  "Seva",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Seva;
