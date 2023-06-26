const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
 

const generateJwt = (id, email, name) => {
  return jwt.sign({ id, email, name }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

const conn = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};

const connect = mysql.createConnection(conn);

class UserController {
  async registration(req, res) {
    const { name, email, password } = req.body;
    // Проверяем, существует ли пользователь с заданным email
    const checkUserQuery = `SELECT * FROM users WHERE email = '${email}'`;
    connect.query(checkUserQuery, async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ msg: "Ошибка сервера" });
      }

      if (results.length > 0) {
        return res.status(400).json({ msg: "Такой email уже существует" });
      }
if (password.length < 6)
  return res
    .status(400)
    .json({ msg: "Наименьшая длина пароля равна 6-ти символам." });
      // Хешируем пароль
      const hashPassword = await bcrypt.hash(password, 5);

      // Создаем нового пользователя
      const createUserQuery = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${hashPassword}')`;
      connect.query(createUserQuery, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ msg: "Ошибка сервера" });
        }

        // Получаем id созданного пользователя
        const userId = results.insertId;
        // Создаем токен для нового пользователя
        const token = generateJwt(userId, email, name);
        return res.json({ token });
      });
    });
  }
  async login(req, res) {
    const { email, password } = req.body;

    // Проверяем, существует ли пользователь с заданным email
    const checkUserQuery = `SELECT * FROM users WHERE email = '${email}'`;
    connect.query(checkUserQuery, async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ msg: "Ошибка сервера" });
      }

      if (results.length === 0) {
        return res.status(400).json({ msg: "Неправильный email или пароль" });
      }

      // Сравниваем хешированный пароль из базы данных с введенным паролем
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Неправильный email или пароль" });
      }

      // Создаем токен для пользователя
      const token = generateJwt(user.id, email, user.name);
      return res.json({ token });
    });
  }
}

module.exports = new UserController();
