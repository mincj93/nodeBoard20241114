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
        detailData: {
            idx: '',
            title: '',
            content: '',
            regdt: dayjs().format('YYYY-MM-DD'),
            regid: '1',
        },
    });

    const [selectedFile, setSelectedFile] = useState(null);  // 추가: 파일 상태

    // 상태 추출
    const { idx, detailData } = state;


    // 상태 변경 함수들
    const onChangeTitle = (e) => {
        setState(prevState => ({
            ...prevState,
            detailData: {
                ...detailData,
                title: e.target.value
            }
        }));
    };

    // 내용 변경
    const onChangeContent = (e) => {
        setState(prevState => ({
            ...prevState,
            detailData: {
                ...detailData,
                content: e.target.value
            }
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
                detailData: res.data[0]
            }));
        }).catch(() => {
            lg('실패함')
        })
    }

    // 저장
    const postSave = async () => {
        lg('postSave')
        const params = {
            title: detailData.title,
            content: detailData.content,
            regid: detailData?.regid || '1'
        }

        await axios.post(`http://${process.env.REACT_APP_API_URL}/board/insertBrd`, params).then((res) => {
            lg('성공 == ', res)
        }).catch((err) => {
            lg('실패함')
        })
    }

    // 취소
    const onCancel = () => {
        navigate(-1);
    };

    // 파일 선택 핸들러 추가
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
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
                        <div className={st.form}>
                            {/* 작성자와 등록일자 추가 */}
                            <div className={st.info_group}>
                                <div className={st.info_item}>
                                    <label>작성자:</label>
                                    <span>{detailData?.regid}</span>
                                </div>
                                <div className={st.info_item}>
                                    <label>등록일자:</label>
                                    <span>{dayjs(detailData?.regdt).format('YYYY년 MM월 DD일 HH:mm:ss')}</span>
                                </div>
                            </div>

                            <div className={st.input_group}>
                                <label htmlFor="title">제목</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={detailData?.title}
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
                                    value={detailData?.content}
                                    onChange={onChangeContent}
                                    required
                                    className={st.textarea_field}
                                    rows="15"
                                    placeholder="내용을 입력하세요"
                                />
                            </div>
                            {/* 파일 업로드 영역 추가 */}
                            {/* <div className={st.input_group}>
                                <label htmlFor="file">첨부파일</label>
                                <div className={st.file_upload_area}>
                                    <input
                                        type="file"
                                        id="file"
                                        onChange={handleFileChange}
                                        className={st.file_input}
                                    />
                                    {selectedFile && (
                                        <div className={st.file_name}>
                                            {selectedFile.name}
                                        </div>
                                    )}
                                </div>
                            </div> */}
                            <div className={st.button_group}>
                                <button className={st.submit_button} onClick={postSave}>
                                    작성완료
                                </button>
                                <button
                                    type="button"
                                    className={st.cancel_button}
                                    onClick={onCancel}
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