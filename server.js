const express = require("express");
const sequelize = require("./db");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
