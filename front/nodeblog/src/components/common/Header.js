// -------------------------------------------------
// reactmoduels import
import { useNavigate } from 'react-router-dom'

// style
import st from '../../style/header.module.css'

// mamaterial ui
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';


function Header() {
  /*
    <Route path="/" element={<Main />} />
    <Route path="/brdList" element={<brdList />} />
    <Route path="/brdWrite" element={<brdWrite />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
  */
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  const goBoard = () => {
    navigate('/brdList');
  }

  const goSignIn = () => {
    navigate('/signIn');
  }

  return (
    <>
      <div className={st.wrap}>
        <div className={st.boxLeft}>
          <div className={st.logo}>
            <h1><a onClick={goHome}>NodeWorld</a></h1>
          </div>
        </div>


        <div className={st.boxRight}>
          <div className={st.menu}>
            <a onClick={goHome}>Home</a>
            <a onClick={goBoard}>Comment</a>
            <a onClick={goSignIn}>SignIn</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
