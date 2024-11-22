import { Button } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios'

function About() {

  const getList2 = () => {
    axios.get('http://localhost/board/getList2').then((결과) => {
      console.log(결과.data)
    })
      .catch(() => {
        console.log('실패함')
      })
  }

  useEffect(() => {
    getList2();
  })
  return (
    <div className="App">
      About 임
      {/* <Button variant="contained">home</Button>
       <Button variant="contained">about</Button>
       <Button variant="contained">login</Button> */}
    </div>
  );
}

export default About;
