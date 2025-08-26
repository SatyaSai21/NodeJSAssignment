const { Sequelize } = require("sequelize");
const config = require("../config/config");


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // 👈 allow self-signed certs
    },
  },
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log("✅ Successfully Connected To Database"))
  .catch(err => console.error("❌ Error connecting DB:", err));

module.exports = sequelize;
