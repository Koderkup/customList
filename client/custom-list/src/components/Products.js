import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const Products = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: 0,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const category = e.target.elements.category.value;
    const price = e.target.elements.price.value;
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form className="login-container" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <div className="item">
            <label htmlFor="title">Name:</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
            ></input>
          </div>
          <div className="item">
            <label htmlFor="category">Email:</label>
            <input
              type="text"
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
            ></input>
          </div>
          <div className="item">
            <label htmlFor="password">Password:</label>
            <input
              type="number"
              step="0.01"
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
    </>
  );
};

export default Products;
