import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Books from './Books';
import Login from './Login';
import Signup from './Signup';
import Cart from './Cart';
import Order from './Order';
import Users from './Users';
import React, { useState, createContext } from "react";

export const AppContext = createContext(null);


function App() {

  const [noItems, setNoItems] = useState([]);
  const [countItems, setCountItems] = useState(0);
  const [userInfo, setUserInfo] = useState("");

  return (
    <AppContext.Provider value={{
      noItems, setNoItems, countItems, setCountItems, userInfo, setUserInfo
    }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Books' element={<Books />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
