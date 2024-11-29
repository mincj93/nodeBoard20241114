import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Button, TextField, Paper, Box } from '@mui/material';
import st from '../../style/main.module.css';
import { Outlet } from 'react-router-dom';

const BoardLayout = () => {
    return (
        <>
            <Header />
                <Outlet></Outlet>
            <Footer />
        </>
    );
};

export default BoardLayout;
