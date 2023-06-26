import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Products from './Products';

const Pages = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Products/>}/>
    </Routes>
  )
}

export default Pages