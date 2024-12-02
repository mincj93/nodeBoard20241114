import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import st from '../../style/board/detail.module.css';
import Header from '../common/Header';
import Footer from '../common/Footer';
function Detail() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API 연동 로직 구현
        navigate('/board/list');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
            <Header />
            <div className={st.mainWrap}>
                <div className={st.banner_content}>
                    <div className={st.form_section}>
                        <h2 className={st.form_title}>Comment 작성</h2>
                        <form onSubmit={handleSubmit} className={st.form}>
                            <div className={st.input_group}>
                                <label htmlFor="title">제목</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
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
                                    value={formData.content}
                                    onChange={handleChange}
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
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Detail;