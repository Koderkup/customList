import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
const Header = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user, setUser] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const { name } = useSelector((state) => state.auth);
  const handleClick = () => {
    if (isLogged) {
      setIsLogged(false);
      localStorage.setItem("auth", "");
    }
  };
  useEffect(() => {
    const formattedDate = new Date().toISOString().substr(0, 10);
    setEndDate(formattedDate);
    setStartDate(formattedDate);
    const auth = localStorage.getItem("auth");
    if (auth) {
      const decodedToken = jwt_decode(auth);
      setUser(decodedToken.name);
    }
    if (user) setIsLogged(true);
    else setIsLogged(false);
  }, [name]);
  return (
    <header className="App-header">
      <ul className="menu">
        <li>Здесь может быть Ваш журнал расходов</li>
        <li style={{ background: "red" }}>{user || "Гость"}</li>
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
          <Link to="/login" onClick={handleClick}>
            {isLogged ? "Выйти" : "Войти"}
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
