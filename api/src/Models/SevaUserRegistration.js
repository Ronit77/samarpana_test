const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Database/index");

const User = require("./User");
const Seva = require("./Seva");

const SevaUserRegistration = sequelize.define(
  "SevaUserRegistration",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    seva_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Seva,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    "80G_certificate_needed": {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: ["INITIATED", "PUJA_DONE", "PROOF_SENT"],
      },
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = SevaUserRegistration;
