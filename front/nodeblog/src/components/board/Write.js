import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Button, TextField, Paper, Box } from '@mui/material';
import st from '../../style/main.module.css';

const Write = () => {
    return (
        <div className={st.mainWrap}>
            <Header />
            <Box
                component={Paper}
                elevation={3}
                sx={{
                    padding: '30px',
                    margin: '40px auto',
                    maxWidth: '600px',
                    backgroundColor: '#34495e',
                    color: '#ecf0f1',
                }}
            >
                <h2 style={{ textAlign: 'center', color: '#1abc9c' }}>글 작성</h2>
                <form>
                    <TextField
                        label="제목"
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: '20px', backgroundColor: '#ecf0f1' }}
                    />
                    <TextField
                        label="내용"
                        multiline
                        rows={6}
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: '20px', backgroundColor: '#ecf0f1' }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: '#1abc9c', padding: '10px 20px' }}
                    >
                        등록하기
                    </Button>
                </form>
            </Box>
            <Footer />
        </div>
    );
};

export default Write;
