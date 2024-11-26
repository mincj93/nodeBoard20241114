import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

// MUI
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// 스타일
import st from '../../style/main.module.css';

// 이미지
import me from '../../images/me.jpg';
// import logo_lightsail from '../../images/logo_lightsail.png';
// import logo_express from '../../images/logo_express.png';
// import logo_mui from '../../images/logo_mui.png';
// import logo_mysql from '../../images/logo_mysql.png';
// import logo_react from '../../images/logo_react.png';

const Main = () => {
  const lg = console.log;


  const [state, setState] = useState({
    // logoList: [logo_react, logo_mui, logo_express, logo_mysql, logo_lightsail],
    logoList: [],
  });


  const { logoList } = state;

  const tableData = [
    { id: 1, title: 'React 소개', date: '2024-11-01', author: 'Admin' },
    { id: 2, title: 'MUI의 장점', date: '2024-11-05', author: 'User1' },
    { id: 3, title: 'Express로 서버 개발하기', date: '2024-11-10', author: 'DevMaster' },
    { id: 4, title: 'MySQL 기본 사용법', date: '2024-11-15', author: 'DBAdmin' },
    { id: 5, title: 'AWS Lightsail 활용', date: '2024-11-20', author: 'CloudExpert' },
  ];

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

  useEffect(() => {
    getLogoList();
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
              lg('imgSrc == ', imgSrc)
              lg('idx == ', idx)
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#1abc9c', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ color: '#1abc9c', fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ color: '#1abc9c', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: '#1abc9c', fontWeight: 'bold' }}>Author</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ color: '#ecf0f1' }}>{row.id}</TableCell>
                    <TableCell sx={{ color: '#ecf0f1' }}>{row.title}</TableCell>
                    <TableCell sx={{ color: '#ecf0f1' }}>{row.date}</TableCell>
                    <TableCell sx={{ color: '#ecf0f1' }}>{row.author}</TableCell>
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
