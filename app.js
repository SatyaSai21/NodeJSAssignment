require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const db = require("./models");  // ⬅️ this runs sync automatically
const schoolRoutes = require("./routes");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/", schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
