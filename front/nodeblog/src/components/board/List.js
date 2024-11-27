
import axios from 'axios'
import { useEffect } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import st from '../../style/main.module.css';

const List = () => {
    const lg = console.log;
    const tableData = [
        { id: 1, title: '첫 번째 게시글', date: '2024-11-01', author: 'Admin' },
        { id: 2, title: '두 번째 게시글', date: '2024-11-05', author: 'User1' },
        { id: 3, title: '세 번째 게시글', date: '2024-11-10', author: 'DevMaster' },
    ];


    const getList2 = () => {
        lg('asdfasdfasfd')
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
        <div className={st.mainWrap}>
            <Header />
            <div className={st.table_section}>
                <h2 style={{ textAlign: 'center', color: '#ecf0f1' }}>게시판 리스트</h2>
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
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#1abc9c',
                        marginTop: '20px',
                        float: 'right',
                    }}
                    href="/boardwrite"
                >
                    새 글 작성
                </Button>
            </div>
            <Footer />
        </div>
    );
};

export default List;
