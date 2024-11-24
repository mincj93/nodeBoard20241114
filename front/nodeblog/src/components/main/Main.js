import React, { useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

// mui
import { Button } from '@mui/material';
import Article from '@mui/icons-material/Article';

// style
import st from '../../style/main.module.css';

const lg = console.log;

const Main = () => {
  const [state, setState] = useState({
    showBlock: false,
  });

  return (
    <>
      <Header />
      <div className={st.banner_content}>
        {/* 프로필 사진 */}
        <div className={st.profile_photo}>
          <img src={`${process.env.PUBLIC_URL}/images/me.jpg`} alt="My Profile" />
        </div>
        {/* 설명 */}
        <div className={st.profile_description}>
          <h2>Hello, I'm [Your Name]</h2>
          <p>
            I'm a passionate developer with expertise in React, Node.js, and modern web technologies. I enjoy solving
            complex problems and creating delightful user experiences.
          </p>
          <Button
            variant="contained"
            startIcon={<Article />}
            onClick={() => lg("Learn More clicked")}
            color="primary"
          >
            Learn More
          </Button>
        </div>
        <div className={st.content_wrapper}>
          {/* 1/3 텍스트 영역 */}
          <div className={st.text_section}>
            <h2>About Me</h2>
            <p>
              I'm a passionate developer with a love for creating seamless user experiences. I specialize in React,
              Node.js, and other modern web technologies. In my free time, I enjoy exploring new technologies and
              contributing to open-source projects.
            </p>
          </div>

          {/* 3/2 이미지 영역 */}
          <div className={st.image_gallery}>
            {[...Array(6)].map((_, idx) => (
              <div className={st.image_item} key={idx}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/me.jpg`}
                  alt={`Sample ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;