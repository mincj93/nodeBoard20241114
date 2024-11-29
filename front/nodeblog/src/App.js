// -------------------------------------------------
// reactmoduels import
import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";

import './App.css';

// components import
import Main from './components/main/Main';
import BrdList from './components/board/List';
import BrdDetail from './components/board/Detail';
import SignIn from './components/user/SignIn';
import SignUp from './components/user/SignUp';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />

        <Route path="/brdList" element={<BrdList />} />
        <Route path="/brdWrite" element={<BrdDetail />} />
        <Route path="/brdDetail/:idx" element={<BrdDetail />} />
        {/* <Route path="/brdDetail" element={<BrdWrite />} /> */}
      </Routes>
    </>
  );
}

export default App;
