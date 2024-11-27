// -------------------------------------------------
// react moduels import
import axios from 'axios'
import { useEffect } from 'react';

// mamaterial ui
import { Button } from '@mui/material';
import { SvgIcon } from '@mui/material'

// components import
import Header from '../common/Header';


// -------------------------------------------------
// 기능정의
const lg = console.log;


function About() {

  const getList2 = () => {
    axios.get('http://43.202.34.90/board/getList2').then((결과) => {
      lg(결과.data)
    })
      .catch(() => {
        lg('실패함')
      })
  }

  useEffect(() => {
    getList2();
  })
  return (
    <div className="App">
      <Header />
      About 임
    </div>
  );
}

export default About;
