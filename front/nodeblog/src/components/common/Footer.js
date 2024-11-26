import { useState } from 'react';
import { Box, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Icon_Email from '@mui/icons-material/Email';
import Icon_GitHub from '@mui/icons-material/GitHub';
import Icon_Create from '@mui/icons-material/Create';
import Icon_LocalPhone from '@mui/icons-material/LocalPhone';

function Footer() {
    const [open, setOpen] = useState(false); // 팝업 열림 상태 관리
    const [dialogContent, setDialogContent] = useState({ title: '', content: '' }); // 현재 팝업의 내용

    const handleOpen = (title, content) => {
        setDialogContent({ title, content });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // 아이콘 및 팝업 데이터 정의
    const navItems = [
        {
            label: 'Phone No.',
            icon: <Icon_LocalPhone />,
            content: 'Phone: +82-10-1234-5678',
            text: 'Phone No.'
        },
        {
            label: 'Comment',
            icon: <Icon_Create />,
            content: 'Feel free to send us a message via the contact form!',
            text: 'Comment'
        },
        {
            label: 'GitHub',
            icon: <Icon_GitHub />,
            content: 'Visit our GitHub repository at https://github.com',
            text: 'GitHub'
        },
        {
            label: 'Email',
            icon: <Icon_Email />,
            content: 'Send us an email at example@gmail.com',
            text: 'Email'
        },
    ];

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#2c3e50',
                padding: '50px 20px',
                color: '#ecf0f1',
                textAlign: 'center',
                borderTop: '2px solid #1abc9c',
                boxShadow: '0px -5px 15px rgba(0, 0, 0, 0.3)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '40px',
                    marginTop: '20px',
                }}
            >
                {navItems.map((item, index) => {
                    return (
                        <>
                            <IconButton
                                title='sdaf'
                                key={index}
                                aria-label={item.label}
                                sx={{
                                    color: '#ecf0f1',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: '#1abc9c',
                                        transform: 'scale(1.1)',
                                    },
                                    // paddingLeft: '5px'
                                }}
                                onClick={() => handleOpen(item.label, item.content)} // 클릭 시 팝업 호출
                            >
                                <Typography >
                                    {item.text}
                                </Typography>
                                {item.icon}
                            </IconButton>
                        </>
                    )
                })}
            </Box>

            {/* 팝업 컴포넌트 */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{dialogContent.title}</DialogTitle>
                <DialogContent>
                    <Typography>{dialogContent.content}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}

export default Footer;
