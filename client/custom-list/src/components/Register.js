import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slice/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    // Проверяем, что введенный email соответствует формату email-адреса
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Некорректный email");
      return;
    }
    try {
      dispatch(register({ name, email, password }));
      setFormData({
        name: "",
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
        <div className="item">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          ></input>
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

export default Register;
