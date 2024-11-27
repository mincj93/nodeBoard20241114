// -------------------------------------------------
// reactmoduels import
import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";

import './App.css';

// components import
import Main from './components/main/Main';
import BrdList from './components/board/List';
import BrdWrite from './components/board/Write';
import SignIn from './components/user/SignIn';
import SignUp from './components/user/SignUp';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/brdlist" element={<BrdList />} />
        <Route path="/brdwrite" element={<BrdWrite />} />
      </Routes>
    </>
  );
}

export default App;
