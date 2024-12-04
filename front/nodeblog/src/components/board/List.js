import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

// MUI Components
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
// import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// 페이징 개똥이라 아래거 쓰기.
import Pagination from "react-js-pagination";
// https://cotak.tistory.com/112 참고


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
        totalPageCnt: 0,
    });

    // 상태 추출
    const { brdList, pageNum, cntPerPage, totalPageCnt } = state;

    // 기능
    // 게시글 목록 가져오기
    const getBrdListPaging = () => {
        const params = {
            pageNum,
            cntPerPage
        }

        axios.post(`http://${process.env.REACT_APP_API_URL}/board/getBrdListPaging`, params).then((res) => {
            // TODO 프로시저를 통해서 총 개수와 목록을 받아옴. 근데 이중배열로 들어오기 때문에 좀 더 쉽게 찾도록 수정할 필요가 있다.
            lg('totalPageCnt == ', res.data[0][0].total_count)
            lg('brdList == ', res.data[1])
            const resData = res.data;
            setState((prevState) => ({
                ...prevState,
                totalPageCnt: res.data[0][0].total_count,
                brdList: resData[1],
            }));
        })
            .catch(() => {
                lg('실패함')
            })
    }

    // 페이지 변경 함수
    const onChangePageNum = (page) => {
        lg('페이지 변경 번호 == ', page)
        setState((prevState) => ({
            ...prevState,
            pageNum: page
        }));
    }

    const goDetail = (idx) => {
        navigate(`/board/detail/${idx}`); // 상세보기 페이지로 이동
    };

    const goCreate = () => {
        navigate('/board/write'); // 작성 페이지로 이동
    };

    useEffect(() => {
        getBrdListPaging();
    }, [pageNum, cntPerPage]);

    return (
        <>
            <Header />
            <div className={st.mainWrap}>
                <div className={st.banner_content}>
                    <div className={st.table_section}>
                        <div className={st.header_section}>
                            <h2 className={st.brdTable_title}>Comment List</h2>
                        </div>
                        <div className={st.total_count}>
                            <div className={st.total_count}>총 {totalPageCnt}건</div>
                        </div>
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
                                activePage={pageNum}
                                itemsCountPerPage={cntPerPage}
                                totalItemsCount={totalPageCnt}
                                pageRangeDisplayed={5}
                                prevPageText={"‹"}
                                nextPageText={"›"}
                                onChange={onChangePageNum}
                                className={st.pagination} // Ensure this matches your CSS class
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
