import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

// MUI Components
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// 컴포넌트
import Header from '../common/Header';
import Footer from '../common/Footer';

// 스타일
import st from '../../style/board/list.module.css';

// 컴포넌트
const BoardList = () => {
    const lg = console.log;
    const navigate = useNavigate();


    // 상태
    const [state, setState] = useState({
        brdList: [],
        pageNum: 1,
        cntPerPage: 5,
    });

    // 상태 추출
    const { brdList, pageNum, cntPerPage } = state;

    // 게시글 목록 가져오기
    const getBrdLast5 = () => {
        axios.post(`http://${process.env.REACT_APP_API_URL}/board/getBrdListPaging`, {
            params: {
                pageNum,
                cntPerPage
            }
        }).then((res) => {
            lg(res.data)
            setState((prevState) => ({
                ...prevState,
                brdList: res.data
            }));
        })
            .catch(() => {
                lg('실패함')
            })
    }

    // 페이지 변경 함수
    const handlePageChange = (e, page) => {
        // lg('페이지 변경 e == ', e.target.value) // 빈값임.
        lg('페이지 변경 번호 == ', page)
        setState((prevState) => ({
            ...prevState,
            pageNum: page
        }));
    }

    useEffect(() => {
        getBrdLast5();
    }, []);

    const goDetail = (idx) => {
        navigate(`/board/detail/${idx}`); // 상세보기 페이지로 이동
    };

    const goCreate = () => {
        navigate('/board/write'); // 작성 페이지로 이동
    };

    return (
        <>
            <Header />
            <div className={st.mainWrap}>
                <div className={st.banner_content}>
                    <div className={st.table_section}>
                        <h2 className={st.brdTable_title}>Comment List</h2>
                        <TableContainer
                            component={Paper}
                            sx={{
                                backgroundColor: '#2c3e50',
                                width: '100%',
                                marginTop: '20px',
                                borderRadius: '8px',
                                border: '1px solid #1abc9c',
                                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            <Table>
                                <TableHead className={st.brdTable_head}>
                                    <TableRow>
                                        <TableCell>번호</TableCell>
                                        <TableCell>제목</TableCell>
                                        <TableCell>작성일</TableCell>
                                        <TableCell>작성자</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className={st.brdTable_body}>
                                    {brdList.map((row, idx) => (
                                        <TableRow key={idx} className={st.brdTable_row}>
                                            <TableCell className={st.brdTable_cell_idx}>{idx + 1}</TableCell>
                                            <TableCell className={st.brdTable_cell_title} onClick={() => goDetail(row.idx)}>{row.title}</TableCell>
                                            <TableCell className={st.brdTable_cell_regdt}>{dayjs(row.regdt).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell className={st.brdTable_cell_regid}>{row.regid}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </TableContainer>

                        <Stack spacing={2} className={st.pagination_wrap}>
                            <Pagination
                                count={3}
                                page={pageNum}
                                onChange={handlePageChange}
                                className={st.pagination}
                            />
                        </Stack>
                        <Button
                            variant="contained"
                            onClick={goCreate}
                            className={st.buttonStyle}
                        >
                            Comment 작성하기
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BoardList;
