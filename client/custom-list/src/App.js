import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Pages from "./components/Pages";
function App() {
  

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Pages />
      </div>
    </BrowserRouter>
  );
}

export default App;
