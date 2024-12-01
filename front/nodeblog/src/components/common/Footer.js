import { useState } from 'react';
import { Box, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Icon_Email from '@mui/icons-material/Email';
import Icon_GitHub from '@mui/icons-material/GitHub';
import Icon_Create from '@mui/icons-material/Create';
import Icon_LocalPhone from '@mui/icons-material/LocalPhone';
import st from '../../style/common/footer.module.css';

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
        <Box className={st.footer}>
            <Box className={st.icons}>
                {navItems.map((item, index) => {
                    return (
                        <>
                            <IconButton
                                key={index}
                                aria-label={item.label}
                                sx={{
                                    color: '#1abc9c',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        color: '#e74c3c',
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
            <Dialog 
                open={open} 
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        backgroundColor: '#34495e',
                        color: '#ecf0f1',
                        minWidth: '300px',
                        maxWidth: '500px',
                        width: '90%',
                        border: '1px solid #1abc9c',
                        borderRadius: '8px',
                        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
                    }
                }}
            >
                <DialogTitle sx={{ 
                    color: '#1abc9c',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderBottom: '1px solid #1abc9c'
                }}>
                    {dialogContent.title}
                </DialogTitle>
                <DialogContent sx={{ 
                    padding: '20px',
                    '& .MuiTypography-root': {
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        wordBreak: 'break-word'
                    }
                }}>
                    <Typography>{dialogContent.content}</Typography>
                </DialogContent>
                <DialogActions sx={{
                    padding: '15px',
                    justifyContent: 'center'
                }}>
                    <Button 
                        onClick={handleClose} 
                        sx={{
                            backgroundColor: '#1abc9c',
                            color: '#ecf0f1',
                            '&:hover': {
                                backgroundColor: '#e74c3c'
                            },
                            padding: '8px 20px'
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </Box >
    );
}

export default Footer;
