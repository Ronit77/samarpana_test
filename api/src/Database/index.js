const Sequelize = require("sequelize");

const dbConfig = require("../Config/database");

const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;
