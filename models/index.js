const sequelize = require("./db");
const School = require("./schools");

const db = {
  sequelize,
  School
};

// Sync models
db.sequelize.sync({ alter: true })
  .then(() => console.log("✅ Models synced with DB"))
  .catch(err => console.error("❌ Error syncing DB:", err));

module.exports = db;
