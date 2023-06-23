import React from 'react'
const Register = () => {
  return (
    <form className="login-container">
      <div className="input-wrapper">
        <div className="item">
          <label htmlFor="email">Name:</label>
          <input type="email" id="email" name="email" required></input>
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

export default Register