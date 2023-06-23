const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mysql = require("mysql");

dotenv.config();
const app = express();
const conn = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};
const connect = mysql.createConnection(conn);

const createUsersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255)
    )
  `;
  connect.query(sql, (err, result) => {
    if (err) throw err;
    console.log("users table created or already exists");
  });
};

const createProductsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      data DATETIME,
      category VARCHAR(255),
      title VARCHAR(255),
      price FLOAT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
  connect.query(sql, (err, result) => {
    if (err) throw err;
    console.log("products table created or already exists");
  });
};
app.use(express.json());
app.use(cors());
app.use("/user", require("./routes/userRouter"));
const start = async () => {
  try {
    connect.connect((err) => {
      if (err) console.log(err);
      else {
        console.log("Connection database ok");
        createUsersTable();
        createProductsTable();
      }
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

