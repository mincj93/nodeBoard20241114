// -------------------------------------------------
// reactmoduels import
import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";

import './App.css';

// components import
import About from './components/main/About';
import Login from './components/main/Login';
import Main from './components/main/Main';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
