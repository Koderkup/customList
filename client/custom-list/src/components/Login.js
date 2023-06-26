import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slice/authSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    try {
      dispatch(login({ email, password }));
      setFormData({
        email: "",
        password: "",
      });
       window.location.href = "http://localhost:3000/";
    } catch (error) {
      // Обрабатываем ошибку
      console.log(error);
    }
  };
  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <div className="choice">
          <p>Забыли зарегестрироваться?</p>
          <Link to="/register">Регистрация</Link>
        </div>
        <div className="item">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          ></input>
        </div>
        <div className="item">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="button-wraper">
        <button className="button" type="submit">
          Отправить
        </button>
      </div>
    </form>
  );
};

export default Login;
