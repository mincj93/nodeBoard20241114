import React, { useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import st from '../../style/auth/signin.module.css';
import axios from 'axios';


const SignIn = () => {
    const lg = console.log;
    const navigate = useNavigate();

    // 상태
    const [state, setState] = useState({
        userId: '',
        userPw: ''
    });

    // 상태 추출
    const { userId, userPw } = state;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('로그인 시도:', userId, userPw);


        const params = {
            userId,
            userPw
        }

        axios.post(`http://${process.env.REACT_APP_API_URL}/auth/login`, params).then((res) => {
            const resData = res.data;
            lg('로그인 시도 9 = ', resData)
        })
            .catch(() => {
                lg('실패함')
            })
    };

    const sessionCreate = () => {
        lg('123')
        const params = {
            userId,
            userPw
        }
        axios.post(`http://${process.env.REACT_APP_API_URL}/auth/sessionCreate`, params).then((res) => {
            const resData = res.data;
            lg('로그인 시도 9 = ', resData)
        })
            .catch(() => {
                lg('실패함')
            })
    }

    return (
        <div className={st.mainWrap}>
            <Header />
            <div className={st.banner_content}>
                <div className={st.signin_container}>
                    <Paper className={st.signin_paper}>
                        <h2>로그인</h2>
                        <TextField
                            name="userId"
                            label="아이디"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={userId}
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
                            name="userPw"
                            label="비밀번호"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={userPw}
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
                            onClick={sessionCreate}
                        >
                            세션테스트
                        </Button>
                    </Paper>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignIn;