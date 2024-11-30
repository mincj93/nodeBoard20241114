import React, { useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import st from '../../style/auth/signup.module.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    representativeName: '',
    companyName: '',
    companyLocation: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // 필수 필드 검증
    if (!formData.username) newErrors.username = '아이디를 입력해주세요';
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요';
    if (!formData.passwordConfirm) newErrors.passwordConfirm = '비밀번호 확인을 입력해주세요';
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다';
    }
    if (!formData.representativeName) newErrors.representativeName = '대표자명을 입력해주세요';
    if (!formData.companyName) newErrors.companyName = '회사명을 입력해주세요';
    if (!formData.companyLocation) newErrors.companyLocation = '회사위치를 입력해주세요';
    if (!formData.email) newErrors.email = '이메일을 입력해주세요';
    if (!formData.phone) newErrors.phone = '전화번호를 입력해주세요';

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    // 전화번호 형식 검증
    const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: 회원가입 로직 구현
      console.log('회원가입 시도:', formData);
    }
  };

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#1abc9c',
      },
      '&:hover fieldset': {
        borderColor: '#e74c3c',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#ecf0f1',
    },
    '& .MuiOutlinedInput-input': {
      color: '#ecf0f1',
    },
  };

  return (
    <div className={st.mainWrap}>
      <Header />
      <div className={st.banner_content}>
        <div className={st.signup_container}>
          <Paper className={st.signup_paper}>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
              <TextField
                name="username"
                label="아이디"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                sx={textFieldStyle}
              />
              <TextField
                name="password"
                label="비밀번호"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={textFieldStyle}
              />
              <TextField
                name="passwordConfirm"
                label="비밀번호 확인"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.passwordConfirm}
                onChange={handleChange}
                error={!!errors.passwordConfirm}
                helperText={errors.passwordConfirm}
                sx={textFieldStyle}
              />
              <TextField
                name="representativeName"
                label="대표자명"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.representativeName}
                onChange={handleChange}
                error={!!errors.representativeName}
                helperText={errors.representativeName}
                sx={textFieldStyle}
              />
              <TextField
                name="companyName"
                label="회사명"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.companyName}
                onChange={handleChange}
                error={!!errors.companyName}
                helperText={errors.companyName}
                sx={textFieldStyle}
              />
              <TextField
                name="companyLocation"
                label="회사위치"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.companyLocation}
                onChange={handleChange}
                error={!!errors.companyLocation}
                helperText={errors.companyLocation}
                sx={textFieldStyle}
              />
              <TextField
                name="email"
                label="이메일"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={textFieldStyle}
              />
              <TextField
                name="phone"
                label="전화번호"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                sx={textFieldStyle}
              />
              <div className={st.button_group}>
                <button type="submit" className={st.submit_button}>
                  회원가입
                </button>
                <button
                  type="button"
                  className={st.cancel_button}
                  onClick={() => navigate('/')}
                >
                  취소
                </button>
              </div>
            </form>

          </Paper>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
