// -------------------------------------------------
// reactmoduels import
import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";

import './App.css';

// components import
import Main from './components/main/Main';
import brdList from './components/board/List';
import brdWrite from './components/board/Write';
import SignIn from './components/user/SignIn';
import SignUp from './components/user/SignUp';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/brdList" element={<brdList />} />
        <Route path="/brdWrite" element={<brdWrite />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
