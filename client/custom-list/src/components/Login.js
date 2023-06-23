import React from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <form className="login-container">
      <div className="input-wrapper">
        <div className="choice">
          <p>Забыли зарегестрироваться?</p>
          <Link to="/register">Регистрация</Link>
        </div>
        <div className="item">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required></input>
        </div>
        <div className="item">
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" required></input>
        </div>
      </div>
      <div className="button-wraper">
        <button className="button" type="submit">
          Отправить
        </button>
      </div>
    </form>
  );
}

export default Login