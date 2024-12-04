import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import axios from 'axios';


// MUI
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

// 스타일
// 이후에 react 프로젝트 커스터마이징 도구인 "craco" 를 사용해서 alias 설정을 해보자
import st from '../../style/main/main.module.css';

// 모듈
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const Main = () => {
  const lg = console.log;
  const navigate = useNavigate();

  // state Obj
  const [state, setState] = useState({
    logoList: ['logo_react.png', 'logo_mui.png', 'logo_express.png', 'logo_mysql.png', 'logo_lightsail.png'],
    brdList: [],
  });

  // state 분해
  const { logoList, brdList } = state;

  const getBrdLast5 = async () => {

    await axios.get(`http://${process.env.REACT_APP_API_URL}/board/getBrdLast5`).then((res) => {
      // lg(res.data)
      // lg(process.env.REACT_APP_API_URL);
      setState((prevState) => ({
        ...prevState,
        brdList: res.data
      }));
    })
      .catch((err) => {
        lg('실패함 err == ', err)
      })
  }



  const goDetail = (idx) => {
    navigate(`/board/detail/${idx}`);
  }

  const goCreate = () => {
    navigate(`/board/write`);
  }

  // 빌드 왜 안되냐?
  useEffect(() => {

    getBrdLast5();
  }, [])

  return (
    <div className={st.mainWrap} >
      <Header />
      <div className={st.banner_content}>
        <div className={st.profile_photo}>
          <img src="/angryDog.jpg" alt="My Profile" />
        </div>
        <div className={st.profile_description}>
          <p className={st.name}>민창준입니다.</p>
          <p>근데 개발을 곁들인</p>
        </div>
        <div className={st.content_wrapper}>
          <div className={st.text_section}>
            <h2>This web is made of</h2>
            <ul>
              <li>React</li>
              <li>Material UI</li>
              <li>Express Framework</li>
              <li>MySQL</li>
              <li>Amazon Web Service (Lightsail)</li>
            </ul>
          </div>
          <div className={st.image_gallery}>
            {logoList.map((imgSrc, idx) => {
              return (
                <div className={st.image_item} key={idx}>
                  <img src={`/images/logos/${imgSrc}`} alt={`Sample ${idx + 1}`} />
                </div>
              )
            })}
          </div>
        </div>
        <div className={st.table_section}>
          <h2 className={st.brdTable_title}>Comment List</h2>
          <TableContainer component={Paper} className={st.tableContainer}>
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
          <Button variant="contained" className={st.comment_button} onClick={goCreate}>
            Comment 작성하기
          </Button>


        </div>
      </div>
      <Footer />
    </div >
  );
};

export default Main;
