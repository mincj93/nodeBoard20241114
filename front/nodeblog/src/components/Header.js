

import { Button } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';

function Header() {
  return (
    <div className="App">
      Header 임
      <Button variant="contained" component={Link} to="/home">home</Button>
      <Button variant="contained" component={Link} to="/about">about</Button>
      <Button variant="contained" component={Link} to="/login">login</Button>
    </div>
  );
}

export default Header;
