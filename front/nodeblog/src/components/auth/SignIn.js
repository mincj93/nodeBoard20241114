import React, { useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import st from '../../style/auth/signin.module.css';

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: 로그인 로직 구현
        console.log('로그인 시도:', formData);
    };

    return (
        <div className={st.mainWrap}>
            <Header />
            <div className={st.banner_content}>
                <div className={st.signin_container}>
                    <Paper className={st.signin_paper}>
                        <h2>로그인</h2>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="username"
                                label="아이디"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formData.username}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#1abc9c',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#e74c3c',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ecf0f1',
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        color: '#ecf0f1',
                                    },
                                }}
                            />
                            <TextField
                                name="password"
                                label="비밀번호"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formData.password}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#1abc9c',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#e74c3c',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ecf0f1',
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        color: '#ecf0f1',
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    marginTop: '20px',
                                    backgroundColor: '#1abc9c',
                                    '&:hover': {
                                        backgroundColor: '#e74c3c',
                                    },
                                }}
                            >
                                로그인
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    marginTop: '20px',
                                    backgroundColor: '#1abc9c',
                                    '&:hover': {
                                        backgroundColor: '#e74c3c',
                                    },
                                }}
                                onClick={() => navigate('/auth/signup')}
                            >
                                회원가입
                            </Button>
                        </form>
                    </Paper>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignIn;