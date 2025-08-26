const { Sequelize } = require("sequelize");
const config = require("../config/config");

// Railway provides DATABASE_URL in the environment
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
  logging: false, // disable logs
});

sequelize.authenticate()
  .then(() => console.log(" Successfully Connected To Database"))
  .catch(err => console.error("Error connecting DB:", err));

module.exports = sequelize;

