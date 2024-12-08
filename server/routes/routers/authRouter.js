// -------------------------------------------------
// 내장함수
const express = require('express');
const path = require('path')
const router = express.Router();

// -------------------------------------------------
// 기능함수
const mysqlConn = require(process.cwd() + '/server/mysql/mysqlConn');
const authQuery = require(process.cwd() + '/server/mysql/query/authQuery');

// -------------------------------------------------
// 변수들
const lg = console.log;

// 다른 컨트롤러와 다르게 passport를 app.js 에서부터 차례대로 내려받았는데, 사용하려면 아래와 같은 형식의 함수로 받아야 한다.
module.exports = function (passport, LocalStrategy) {


    // 아이디 존재 여부 확인
    const checkUser = async (inputId, inputPw) => {
        lg('아이디 존재 여부 확인 시도 = ', inputId, inputPw)
        const userId = await mysqlConn.connectDb(authQuery.checkUserId, [inputId, inputPw]);
        return userId;
    }


    // 로그인 시도 시 아이디 비번 검토
    passport.use(new LocalStrategy(async (inputUserId, inputUserPw, cb) => {
        try {
            lg('로그인 시도 5 = ', inputUserId, inputUserPw)
            let userInfo = await checkUser(inputUserId, inputUserPw) //조회하기
            lg('조회 결과 == ', userInfo)
            // 조회결과에 따른 분기
            if (!userInfo) {
                return cb(null, false, { message: '아이디 DB에 없음' })
            }
            if (userInfo[0].pworg == inputUserPw) {
                return cb(null, userInfo)
            } else {
                return cb(null, false, { message: '비번불일치' });
            }
        } catch (err) {
            return cb(lg('passport 오류', err));
        }


    }))


    // 로그인
    router.post('/login', (req, res, next) => {
        // passport 로 아이디 비밀번호 검토하는 기능 실행

        lg('로그인 시도 1 = ', req.body)
        passport.authenticate('local', (err, user, info) => {
            lg('로그인 시도 2 = ', err)
            lg('로그인 시도 3 = ', user)
            lg('로그인 시도 4 = ', info)
            /*
                err : 오류 발생시 오류 반환
                user : DB 조회 후 성공 시 유저 정보
                info : 성공은 했지만 로그인이 안되는 경우 오류 메시지
            */

            if (err) {
                lg('로그인 시도 6 에러')
                return res.send({ message: '오류 발생' });
            } // 오류 발생시 오류 반환
            if (!user) {
                lg('로그인 시도 7 유저 없음')
                return res.send({ message: '아이디 또는 비번 오류' });
            } // 유저 없으면 오류 반환
            req.logIn(user, (err) => {
                lg('로그인 시도 8 세션 저장')
                return res.send({ message: '로그인 성공. 세션 저장.' });
            });
        })(req, res, next);
    });

    // 여기에 추가 인증 관련 라우트들 작성 가능
    // 예: 로그아웃, 회원가입 등

    return router;
};


/*
passport를 app.js 에서부터 차례대로 내려받았는데, 사용하려면 아래와 같은 형식의 함수로 받아야 한다.

router.post('/login', async (req, res) => {
    lg('로그인 시도 1 = ',req.body)
    passport.use(new LocalStrategy(async (입력한아이디, 입력한비번, cb) => {
        lg('로그인 시도 2 = ',입력한아이디, 입력한비번)
        let result = await db.collection('user').findOne({ username : 입력한아이디})
        if (!result) {
          return cb(null, false, { message: '아이디 DB에 없음' })
        }
        if (result.password == 입력한비번) {
          return cb(null, result)
        } else {
          return cb(null, false, { message: '비번불일치' });
        }
      }))
})

module.exports = router;
 */