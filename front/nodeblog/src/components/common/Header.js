// -------------------------------------------------
// reactmoduels import
import { useNavigate } from 'react-router-dom'

// style
import st from '../../style/header.module.css'

// mamaterial ui
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';


function Header() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  const goCarer = () => {
    navigate('/career');
  }

  const goBoard = () => {
    navigate('/board');
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
            <a onClick={goCarer}>Career</a>
            <a onClick={goBoard}>Comment</a>
            <a className="button primary">Sign Up</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
