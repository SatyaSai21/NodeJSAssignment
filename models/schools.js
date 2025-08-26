const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const School = sequelize.define("School", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: -90,
      max: 90,
    },
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: -180,
      max: 180,
    },
  },
});

module.exports = School;
