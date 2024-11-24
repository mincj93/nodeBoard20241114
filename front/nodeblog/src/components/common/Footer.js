// -------------------------------------------------
// reactmoduels import
import { useNavigate } from 'react-router-dom'

// mamaterial ui
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

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
                    <li><a href="#" class="icon brands alt fa-twitter"><span class="label">Twitter</span></a></li>
                    <li><a href="#" class="icon brands alt fa-facebook-f"><span class="label">Facebook</span></a></li>
                    <li><a href="#" class="icon brands alt fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
                    <li><a href="#" class="icon brands alt fa-instagram"><span class="label">Instagram</span></a></li>
                    <li><a href="#" class="icon brands alt fa-github"><span class="label">GitHub</span></a></li>
                    <li><a href="#" class="icon solid alt fa-envelope"><span class="label">Email</span></a></li>
                </ul>
                <ul class="copyright">
                    <li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                </ul>
            </footer>
        </>
    );
}

export default Header;
