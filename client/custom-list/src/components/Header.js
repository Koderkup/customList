import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const formattedDate = new Date().toISOString().substr(0, 10);
    setEndDate(formattedDate);
    setStartDate(formattedDate);
  }, [name]);
  return (
    <header className="App-header">
      <ul className="menu">
        <li>Здесь может быть Ваш журнал расходов</li>
        <li>{name || "Гость"}</li>
        <li>
          <label htmlFor="startDateInput">Начальная дата:</label>
          <input
            id="startDateInput"
            name="startDateInput"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="endDateInput">Конечная дата:</label>
          <input
            id="endDateInput"
            name="endDateInput"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </li>
        <li>
         <Link to="/login">Войти</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
