import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import axios from 'axios';


// MUI
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// 스타일
import st from '../../style/main.module.css';

// 이미지
import me from '../../images/me.jpg';
import logo_react from '../../images/logo_react.png';
import logo_mui from '../../images/logo_mui.png';
import logo_express from '../../images/logo_express.png';
import logo_mysql from '../../images/logo_mysql.png';
import logo_lightsail from '../../images/logo_lightsail.png';

const Main = () => {
  const lg = console.log;


  const [state, setState] = useState({
    logoList: [logo_react, logo_mui, logo_express, logo_mysql, logo_lightsail],
    // logoList: [],
    brdList: [],
  });


  const { logoList, brdList } = state;

  // logo이미지 한번에 가져오기
  const getLogoList = () => {
    // const reqLogoList = require.context('이미지경로', 하위폴더포함여부 true false, 허용 이미지 확장자);
    const reqLogoList = require.context('../../images/logo', false, /\.(png|jpe?g|svg)$/);
    const logoList = reqLogoList.keys().map(item => reqLogoList(item));
    setState((prevState) => ({
      ...prevState,
      logoList: logoList
    }));
  }


  const getBrdLast5 = () => {
    axios.get(`http://${process.env.REACT_APP_API_URL}/board/getBrdLast5`).then((res) => {
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

  useEffect(() => {
    // getLogoList(); 순서가 바뀌어서 들어오기에 그냥 6개라 import로 바꿈
    getBrdLast5();
  }, [])

  return (
    <div className={st.mainWrap} >
      <Header />
      <div className={st.banner_content}>
        <div className={st.profile_photo}>
          <img src={me} alt="My Profile" />
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
                  <img src={imgSrc} alt={`Sample ${idx + 1}`} />
                </div>
              )
            })}
          </div>
        </div>
        <div className={st.table_section}>
          <h2 style={{ textAlign: 'center', color: '#ecf0f1' }}>게시판</h2>
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: '#34495e',
              width: '100%',
            }}
          >
            <Table >
              <TableHead className={st.brdTable_head}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Author</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={st.brdTable_body}>
                {brdList.map((row, idx) => (
                  <TableRow key={idx} className={st.brdTable_row}>
                    <TableCell className={st.brdTable_cell_idx}>{idx + 1}</TableCell>
                    <TableCell className={st.brdTable_cell_title}>{row.title}</TableCell>
                    <TableCell className={st.brdTable_cell_regdt}>{row.regdt}</TableCell>
                    <TableCell className={st.brdTable_cell_regid}>{row.regid}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
