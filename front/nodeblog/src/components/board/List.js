import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// MUI Components
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography, Box } from '@mui/material';
import Header from '../common/Header';
import Footer from '../common/Footer';

// 스타일
import styles from '../../style/board/list.module.css';

const BoardList = () => {
    const [boardList, setBoardList] = useState([]);
    const navigate = useNavigate();

    // 게시글 목록 가져오기
    const fetchBoardList = () => {
        axios.get(`http://${process.env.REACT_APP_API_URL}/board/list`)
            .then((res) => {
                setBoardList(res.data);
            })
            .catch(() => console.error('데이터 로드 실패'));
    };

    useEffect(() => {
        fetchBoardList();
    }, []);

    const goDetail = (idx) => {
        navigate(`/brdDetail/${idx}`); // 상세보기 페이지로 이동
    };

    const goCreate = () => {
        navigate('/brdDetail'); // 작성 페이지로 이동
    };

    return (
        <>
            <Header />
            <div className={styles.mainWrap}>
                <Box className={styles.listWrapper} component={Paper} elevation={3}>
                    <Typography className={styles.listTitle}>게시글 목록</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">번호</TableCell>
                                    <TableCell>제목</TableCell>
                                    <TableCell align="center">작성자</TableCell>
                                    <TableCell align="center">작성일</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {boardList.map((board, idx) => (
                                    <TableRow key={board.idx} hover onClick={() => goDetail(board.idx)} className={styles.tableRow}>
                                        <TableCell align="center">{idx + 1}</TableCell>
                                        <TableCell>{board.title}</TableCell>
                                        <TableCell align="center">{board.regid}</TableCell>
                                        <TableCell align="center">{board.regdt}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box className={styles.actionButtons}>
                        <Button variant="contained" className={styles.createButton} onClick={goCreate}>
                            작성하기
                        </Button>
                    </Box>
                </Box>
            </div>
            <Footer />
        </>
    );
};

export default BoardList;
