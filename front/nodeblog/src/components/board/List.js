import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

// MUI Components
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
    const location = useLocation();
    const searchParams = location.state?.searchParams || '';
    // lg(`props == `, props)

    // 상태
    const [state, setState] = useState({
        brdList: [],
        srchSelect: searchParams.srchSelect || '',
        srchTxt: searchParams.srchTxt || '',

        pageNum: searchParams.pageNum || 1,
        pageSize: 5,
        totalPageCnt: 0,
    });

    // 상태 추출
    const { brdList, srchSelect, srchTxt, pageNum, pageSize, totalPageCnt } = state;

    // 기능
    // 검색
    const getBrdList = (isNewSearch) => {
        if (isNewSearch) {
            // 검색버튼 통한 검색을 실행 시 1페이지로 이동
            setState((prevState) => ({
                ...prevState,
                pageNum: 1
            }));
            lg('1 페이지 검색')
        }

        const params = {
            srchSelect,
            srchTxt,
            pageNum: isNewSearch ? 1 : pageNum,
            pageSize
        }

        axios.post(`http://${process.env.REACT_APP_API_URL}/board/getBrdList`, params).then((res) => {
            // TODO 프로시저를 통해서 총 개수와 목록을 받아옴. 근데 이중배열로 들어오기 때문에 좀 더 쉽게 찾도록 수정할 필요가 있다.
            // lg('totalPageCnt == ', res.data[0][0].total_count)
            // lg('brdList == ', res.data[1])
            const resData = res.data;
            setState((prevState) => ({
                ...prevState,
                totalPageCnt: res.data[0][0].total_count,
                brdList: resData[1],
            }));
        })
            .catch(() => {
                lg('목록조회 실패')
            })
    }

    // 검색구분
    const onchangeSelect = (e) => {
        setState((prevState) => ({
            ...prevState,
            srchSelect: e.target.value,
        }));
    }

    // 검색어
    const onchangeSrchTxt = (e) => {
        setState((prevState) => ({
            ...prevState,
            srchTxt: e.target.value,
        }));
    }

    // 페이지 변경 함수
    const onChangePageNum = (page) => {
        // lg('페이지 변경 번호 == ', page)
        setState((prevState) => ({
            ...prevState,
            pageNum: page
        }));
    }

    const goToDetail = (idx) => {
        navigate(`/board/detail/${idx}`, {
            state: {
                searchParams: {
                    srchSelect,
                    srchTxt,
                    pageNum,
                    // 필요한 다른 검색 조건들도 추가
                }
            }
        });
    };

    const goCreate = () => {
        navigate('/board/write'); // 작성 페이지로 이동
    };

    // 엔터 키 입력 이벤트
    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            getBrdList(true);
        }
    }

    useEffect(() => {
        getBrdList();
    }, [pageNum, pageSize]);

    return (
        <>
            <Header />
            <div className={st.mainWrap}>
                <div className={st.banner_content}>
                    <div className={st.table_section}>
                        <div className={st.header_section}>
                            <h2 className={st.brdTable_title}>Comment List</h2>
                        </div>
                        <div className={st.search_section}>
                            <Select
                                value={srchSelect}
                                onChange={onchangeSelect}
                                className={st.search_select}
                                displayEmpty={true} // select 값이 없을 때 빈 값의 표출값인 '전체' 표시
                            >
                                <MenuItem value={''}>전체</MenuItem>
                                <MenuItem value={'1'}>제목</MenuItem>
                                <MenuItem value={'2'}>작성자</MenuItem>
                            </Select>
                            <input
                                type="text"
                                value={srchTxt}
                                onChange={onchangeSrchTxt}
                                placeholder="검색어를 입력하세요."
                                className={st.search_input}
                                onKeyUp={pressEnter}
                            />
                            <Button
                                variant="contained"
                                onClick={() => getBrdList(true)}
                                className={st.search_button}
                            >
                                검색
                            </Button>
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
                                        <TableCell>작성자</TableCell>
                                        <TableCell>작성일</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className={st.brdTable_body}>
                                    {brdList.length > 0 ? (brdList.map((row, idx) => (
                                        <TableRow key={idx} className={st.brdTable_row}>
                                            <TableCell className={st.brdTable_cell_idx}>{idx + 1}</TableCell>
                                            <TableCell className={st.brdTable_cell_title} onClick={() => goToDetail(row.idx)}>{row.title}</TableCell>
                                            <TableCell className={st.brdTable_cell_regid}>{row.regid}</TableCell>
                                            <TableCell className={st.brdTable_cell_regdt}>{dayjs(row.regdt).format('YYYY-MM-DD')}</TableCell>
                                        </TableRow>
                                    ))) : (
                                        <TableRow>
                                            <TableCell colSpan={4} style={{ textAlign: 'center', padding: '30px 0', height: '300px' }}>
                                                검색결과가 없습니다.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                        </TableContainer>


                        <Stack spacing={2} className={st.pagination_wrap}>
                            <Pagination
                                activePage={pageNum}
                                itemsCountPerPage={pageSize}
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
