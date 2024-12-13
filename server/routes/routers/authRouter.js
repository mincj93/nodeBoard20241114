// -------------------------------------------------
// 내장함수
const express = require('express');
const session = require('express-session')
const router = express.Router();


const app = express();

// 세션 설정 필요요소
// const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')

app.use(passport.initialize())
app.use(session({
    secret: process.env.SESSIONSCRTKEY, // 이 비밀번호 털리면 내 사이트 털림
    resave: false, // 서버에 요청시마다 갱신할 것인지? (보통 false)
    saveUninitialized: false, // 로그인 안 해도 세션을 생성할지? (보통 false)
    cookie : { maxAge : 1 * 60 * 1000 }
}))

app.use(passport.session())
// 세션 설정 필요요소 끝


passport.serializeUser((user, done) => {
    lg('serializeUser');
    process.nextTick(() => {
        done(null, { id: user._id, username: user.username })
    })
})


passport.deserializeUser((user, done) => {
    lg('deserializeUser');
    process.nextTick(() => {
        return done(null, user)
    })
})

passport.use(new LocalStrategy(async (입력한아이디, 입력한비번, cb) => {

    const userInfo = await mysqlConn.connectDb(authQuery.checkUserId, [입력한아이디, 입력한비번]);
    lg('userInfo == ', userInfo)
    if (!userInfo) {
        return cb(null, false, { message: '아이디 DB에 없음' })
    }
    if (userInfo.pworg == 입력한비번) {
        return cb(null, result)
    } else {
        return cb(null, false, { message: '비번불일치' });
    }
}))

// -------------------------------------------------
// 기능함수
const mysqlConn = require(process.cwd() + '/server/mysql/mysqlConn');
const authQuery = require(process.cwd() + '/server/mysql/query/authQuery');

// -------------------------------------------------
// 변수들
const lg = console.log;

app.use(session({
    secret: 'AlsCkd!@34', // 이 비밀번호 털리면 내 사이트 털림
    resave: false, // 서버에 요청시마다 갱신할 것인지? (보통 false)
    saveUninitialized: false // 로그인 안 해도 세션을 생성할지? (보통 false)
}))

// 아이디 존재 여부 확인
const checkUser = async (inputId, inputPw) => {
    lg('아이디 존재 여부 확인 시도 = ', inputId, inputPw)
    const userInfo = await mysqlConn.connectDb(authQuery.checkUserId, [inputId, inputPw]);
    lg('userinfo = ', userInfo)
    return userInfo;
}


// 로그인
router.post('/login', (req, res, next) => {

});

// 로그인
router.post('/sessionCreate', async (req, res, next) => {
    //세션 테스트
    const reqData = req.body;
    lg('reqData == ', reqData)

    const userInfo = await checkUser(reqData.userId, reqData.userPw);

    lg('userInfo == ', userInfo)

    passport.authenticate('local', (error, user, info) => {
        if (error) return res.status(500).json(error)
        lg(error,info)
        if (!user) return res.status(401).json(info.message)
            lg('req == ' , req)
        req.logIn(user, (err) => {
            if (err) return next(err)

            lg('유저존재 확인. user ==', user);
        })
    })(req, res, next)

});


module.exports = router;