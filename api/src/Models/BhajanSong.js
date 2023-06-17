const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../Database/index");

const BhajanSongs = sequelize.define(
  "BhajanSongs",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meta_data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    song_storage_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    song_streaming_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    album_storage_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    album_url: {
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

module.exports = BhajanSongs;
