import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

// MUI Components
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import Header from '../common/Header';
import Footer from '../common/Footer';

// 스타일
import styles from '../../style/board/detail.module.css';

const BoardDetail = () => {
    const { idx } = useParams();
    const navigate = useNavigate();
    const isEdit = !!idx;
    const [boardData, setBoardData] = useState({
        title: '',
        content: '',
        regid: '',
        regdt: dayjs().format('YYYY-MM-DD'),
    });

    const fetchBoardDetail = () => {
        if (isEdit) {
            axios.get(`http://${process.env.REACT_APP_API_URL}/board/${idx}`)
                .then((res) => {
                    setBoardData(res.data);
                })
                .catch(() => console.error('데이터 로드 실패'));
        }
    };

    const saveBoardData = () => {
        const url = isEdit
            ? `http://${process.env.REACT_APP_API_URL}/board/update/${idx}`
            : `http://${process.env.REACT_APP_API_URL}/board/create`;

        axios.post(url, boardData)
            .then(() => navigate('/'))
            .catch(() => console.error('저장 실패'));
    };

    useEffect(() => {
        fetchBoardDetail();
        window.scrollTo(0, 0);
    }, [idx]);

    return (
        <>
            <Header />
            <div className={styles.mainWrap}>
                <Box className={styles.detailWrapper}>
                    <Typography className={styles.detailTitle}>
                        <h2>{isEdit ? 'Comment 수정' : 'Comment 작성'}</h2>
                    </Typography>

                    <Box>
                        <div className='input_title'>
                            <text className='text_label'>제목</text>
                            <TextField
                                fullWidth
                                className={styles.detailField}
                                // label="제목"
                                variant="outlined"
                                value={boardData.title}
                                onChange={(e) => setBoardData({ ...boardData, title: e.target.value })}
                            />
                        </div>

                        <div className='input_title'>
                            <text>작성자</text>
                            <TextField
                                fullWidth
                                className={styles.detailField}
                                // label="작성자"
                                variant="outlined"
                                value={boardData.regid}
                                onChange={(e) => setBoardData({ ...boardData, regid: e.target.value })}
                            />
                        </div>
                        <div className='input_title'>
                            <text>내용</text>
                            <TextField
                                fullWidth
                                className={styles.detailField}
                                // label="내용"
                                variant="outlined"
                                multiline
                                rows={8}
                                value={boardData.content}
                                onChange={(e) => setBoardData({ ...boardData, content: e.target.value })}
                            />
                        </div>
                    </Box>

                    <Box className={styles.detailButtons}>
                        <Button variant="contained" onClick={saveBoardData}>
                            {isEdit ? '수정' : '작성'}
                        </Button>
                        <Button variant="outlined" onClick={() => navigate('/')}>
                            취소
                        </Button>
                    </Box>
                </Box>
            </div>
            <Footer />
        </>
    );
};

export default BoardDetail;
