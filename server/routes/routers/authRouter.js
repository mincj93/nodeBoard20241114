// -------------------------------------------------
const dayjs = require('dayjs');
const express = require('express');
const session = require('express-session');
const router = express.Router();


const app = express();

// JSON 파싱 미들웨어 추가 (req.body를 사용하려면 필요)
app.use(express.json());

// -------------------------------------------------
const mysqlConn = require(process.cwd() + '/server/mysql/mysqlConn');
const authQuery = require(process.cwd() + '/server/mysql/query/authQuery');

// -------------------------------------------------
// 변수들
const lg = console.log;

// 아이디 존재 여부 확인
const checkUser = async (inputId, inputPw) => {
    lg('아이디 존재 여부 확인 시도 = ', inputId, inputPw);
    const userInfo = await mysqlConn.connectDb(authQuery.checkUserId, [inputId, inputPw]);
    lg('userinfo = ', userInfo);
    return userInfo;
};

// 로그인 처리 라우트
router.post('/sessionCreate', async (req, res, next) => {
    try {
        const { userId, userPw } = req.body;

        // 사용자 확인
        const userInfo = await checkUser(userId, userPw);
        lg('userInfo =======-=-=-==', userInfo);

        if (userInfo && userInfo.length > 0) {
            // 사용자 인증 성공
            // 세션에 사용자 정보 저장
            req.session.user = {
                name: userInfo[0].name, // 필요한 정보 추가
                id: userInfo[0].id, // 예: 관리자, 일반 사용자 등
                compNm: userInfo[0].compNm
            };

            lg('세션 생성 완료: ', 234);
            lg('세션 생성 완료: ', req.session.user);

            // 성공 응답
            
            console.log('세션 데이터:', req.session);
            console.log('세션 데이터:', dayjs(req.session.cookie._expires).format('YYYY MM DD hh:mm:ss')); 
            res.status(200).json({
                success: true,
                message: '로그인 성공',
                session: req.session.user
            });
        } else {
            // 사용자 인증 실패
            res.status(401).json({
                success: false,
                message: '아이디 또는 비밀번호가 잘못되었습니다.'
            });
        }
    } catch (error) {
        lg('로그인 처리 중 에러 발생: ', error);

        // 에러 응답
        res.status(500).json({
            success: false,
            message: '서버 에러가 발생했습니다.',
            error: error.message
        });
    }
});

module.exports = router;
