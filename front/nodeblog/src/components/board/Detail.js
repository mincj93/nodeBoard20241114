import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

// CSS
import st from '../../style/board/detail.module.css';

// 컴포넌트
import Header from '../common/Header';
import Footer from '../common/Footer';


const Detail = () => {
    const lg = console.log;
    const usp = useParams(); // /board/:idx와 동일한 변수명으로 꺼내기 가능
    const navigate = useNavigate();

    // 상태
    const [state, setState] = useState({
        idx: usp?.idx,
        data: {
            idx: '',
            title: '',
            content: '',
            regdt: dayjs().format('YYYY-MM-DD'),
            regid: '1',
        },
    });

    // 상태 추출
    const { idx, data } = state;


    // 상태 변경 함수들
    const onChangeTitle = (e) => {
        setState(prevState => ({
            ...prevState,
            title: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API 연동 로직 구현
        navigate('/board/list');
    };


    // 기능 함수
    const getBrdDtl = () => {
        const params = {
            idx
        }

        axios.post(`http://${process.env.REACT_APP_API_URL}/board/getBrdDtl`, params).then((res) => {
            lg(res.data[0])
            setState((prevState) => ({
                ...prevState,
                data: res.data[0]
            }));
        })
            .catch(() => {
                lg('실패함')
            })
    }

    const handleCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        getBrdDtl();
    }, [idx])

    return (
        <>
            <Header />
            <div className={st.mainWrap}>
                <div className={st.banner_content}>
                    <div className={st.form_section}>
                        <h2 className={st.form_title}>Comment 작성</h2>
                        <div onSubmit={handleSubmit} className={st.form}>
                            <div className={st.input_group}>
                                <label htmlFor="title">제목</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={onChangeTitle}
                                    required
                                    className={st.input_field}
                                    placeholder="제목을 입력하세요"
                                />
                            </div>
                            <div className={st.input_group}>
                                <label htmlFor="content">내용</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={data.content}
                                    // onChange={handleChange}
                                    required
                                    className={st.textarea_field}
                                    rows="15"
                                    placeholder="내용을 입력하세요"
                                />
                            </div>
                            <div className={st.button_group}>
                                <button type="submit" className={st.submit_button}>
                                    작성완료
                                </button>
                                <button
                                    type="button"
                                    className={st.cancel_button}
                                    onClick={handleCancel}
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Detail;