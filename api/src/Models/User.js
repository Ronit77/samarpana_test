const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../Database/index");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    anniversary: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    religion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar_file_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
      //validate: {
        //is: /^\+\d{1,3}\s\d{3}\s\d{3}\s\d{4}$/, // validation check for phone number format
      //},
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

User.beforeBulkCreate(async (users, options) => {
  for (let user of users) {
    if (user.password) {
      console.log("I am inside");
      const salt = await bcrypt.genSalt(10);
      user.dataValues.password = await bcrypt.hash(user.password, salt);
      console.log("User- ", user);
    }
  }
});

module.exports = User;
