// -------------------------------------------------
// reactmoduels import
import { useNavigate } from 'react-router-dom'


// style
import st from '../../style/header.module.css'

// mamaterial ui
import { Button } from '@mui/material';
import Icon_Email from '@mui/icons-material/Email';
import Icon_GitHub from '@mui/icons-material/GitHub';
import Icon_Create from '@mui/icons-material/Create';
import Icon_LocalPhone from '@mui/icons-material/LocalPhone';


function Header() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    }

    const goAbout = () => {
        navigate('/about');
    }

    const goLogin = () => {
        navigate('/login');
    }

    return (
        <>
            <footer id="footer">
                <ul class="icons">
                    <li><a href="#" class="icon brands alt fa-instagram"><span class="label"><Icon_LocalPhone /></span></a></li>
                    <li><a href="#" class="icon brands alt fa-instagram"><span class="label"><Icon_Create /></span></a></li>
                    <li><a href="#" class="icon brands alt fa-github"><span class="label">GitHub<Icon_GitHub /></span></a></li>
                    <li><a href="#" class="icon solid alt fa-envelope"><span class="label">Email<Icon_Email /></span></a></li>
                </ul>
                <ul class="copyright">
                    <li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                </ul>
            </footer>
        </>
    );
}

export default Header;
