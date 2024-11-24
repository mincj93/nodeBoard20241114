// -------------------------------------------------
// reactmoduels import
import { useNavigate } from 'react-router-dom'

// mamaterial ui
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';


// components import
import Header from '../common/Header';


// -------------------------------------------------
// 기능정의
const lg = console.log;


function Login() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Header></Header>
      Login임
    </div>
  );
}

export default Login;
