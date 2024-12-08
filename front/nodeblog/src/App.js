// -------------------------------------------------
// reactmoduels import
import logo from './logo.svg';
import { Routes, Route, Link, Navigate } from "react-router-dom";

import './App.css';

// components import
import Main from './components/main/Main';
import BrdList from './components/board/List';
import BrdDetail from './components/board/Detail';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';


function App() {
  return (
    <Routes>
      {/* 메인 페이지 */}
      <Route path="/" element={<Main />} />

      {/* 사용자 관련 라우트 그룹 */}
      <Route path="/auth">
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      {/* 게시판 관련 라우트 그룹 */}
      <Route path="/board">
        <Route path="list" element={<BrdList />} />
        <Route path="write" element={<BrdDetail />} />
        <Route path="detail/:idx" element={<BrdDetail />} />
      </Route>

      {/* 없는 페이지 호출 시 메인으로 보내기 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
