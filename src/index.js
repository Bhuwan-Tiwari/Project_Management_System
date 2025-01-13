require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/Routes.js");
const { configDotenv } = require("dotenv");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", apiRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
