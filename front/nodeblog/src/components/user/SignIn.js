import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Button, TextField, Paper, Box } from '@mui/material';
import st from '../../style/signin.module.css';

const Signin = () => {
    return (
        <div className={st.mainWrap}>
            <Header />
            <Box
                component={Paper}
                elevation={3}
                sx={{
                    padding: '30px',
                    margin: '40px auto',
                    maxWidth: '400px',
                    backgroundColor: '#34495e',
                    color: '#ecf0f1',
                }}
            >
                <h2 style={{ textAlign: 'center', color: '#1abc9c' }}>로그인</h2>
                <form>
                    <TextField
                        label="이메일"
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: '20px', backgroundColor: '#ecf0f1' }}
                    />
                    <TextField
                        label="비밀번호"
                        type="password"
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: '20px', backgroundColor: '#ecf0f1' }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ backgroundColor: '#1abc9c', padding: '10px 0' }}
                    >
                        로그인
                    </Button>
                </form>
            </Box>
            <Footer />
        </div>
    );
};

export default Signin;
