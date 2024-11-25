import React, { useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

// mui
import { Button } from '@mui/material';
import Article from '@mui/icons-material/Article';

// style
import st from '../../style/main.module.css';

// img
import me from '../../images/me.jpg'
import dog from '../../images/angryDog.jpg'
import logo_lightsail from '../../images/logo_lightsail.png'
import logo_express from '../../images/logo_express.png'
import logo_mui from '../../images/logo_mui.png'
import logo_mysql from '../../images/logo_mysql.png'
import logo_react from '../../images/logo_react.png'

const lg = console.log;

const Main = () => {
  const [state, setState] = useState({
    logos: [logo_react, logo_mui, logo_express, logo_mysql, logo_lightsail]
  });

  const { logos } = state;

  return (
    <div style={{ minWidth: '600px' }}>
      <Header />
      <div className={st.banner_content}>
        {/* 프로필 사진 */}
        <div className={st.profile_photo}>
          <img src={me} alt="My Profile" />
        </div>
        {/* 설명 */}
        <div className={st.profile_description}>
          <p className={st.name}>민창준입니다.</p>
          <p>
            근데 개발을 곁들인
          </p>

        </div>
        <div className={st.content_wrapper}>
          {/* 1/3 텍스트 영역 */}
          <div className={st.text_section}>
            <h2>This web is made of</h2>
            <p>
              <ul>
                <li>React</li>
                <li>Material UI</li>
                <li>Express Framework</li>
                <li>MySQL</li>
                <li>Amazone Web Service (Lightsail)</li>
              </ul>
            </p>
            {/* <Button
              variant="contained"
              startIcon={<Article />}
              onClick={() => lg("Learn More clicked")}
              color="primary"
            >
              Learn More
            </Button> */}
          </div>

          {/* 3/2 이미지 영역 */}
          <div className={st.image_gallery}>
            {logos.map((imgSrc, idx) => (
              <div className={st.image_item} key={idx}>
                <img
                  src={imgSrc}
                  alt={`Sample ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;