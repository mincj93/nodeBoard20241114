// -------------------------------------------------
// reactmoduels import
import { useNavigate } from 'react-router-dom'


// style
import st from '../../style/footer.module.css'

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
            <footer id={st.footer}>
                <ul class={st.icons}>
                    <li><a class={st.icon_LocalPhone}><span class="label">Phone no.<Icon_LocalPhone /></span></a></li>
                    <li><a class={st.icon_Create}><span class="label">Contact<Icon_Create /></span></a></li>
                    <li><a class={st.icon_GitHub}><span class="label">GitHub<Icon_GitHub /></span></a></li>
                    <li><a class={st.icon_Email}><span class="label">Email<Icon_Email /></span></a></li>
                </ul>
            </footer>
        </>
    );
}

export default Header;
