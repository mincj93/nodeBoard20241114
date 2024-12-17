// -------------------------------------------------
// 모듈
const express = require('express');
const router = express.Router();
const path = require('path')
const dotenv = require("dotenv").config();
const routerController = require('./server/routes/routeController.js');
const cors = require('cors');
const session = require('express-session');


// -------------------------------------------------
// express 설정
const app = express();
// app.use(express.static(path.join(process.cwd(), '/front/nodeblog/build'))); // react 프론트 경로 연결 1
app.use(express.static(path.join(__dirname, '/public/build')));
// 세션 설정
app.use(session({
    secret: process.env.SESSIONSCRTKEY, // 이 비밀번호 털리면 내 사이트 털림
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 5 * 60 * 1000, // 쿠키 유효 시간 (5분)
        httpOnly: true,       // 클라이언트에서 쿠키 접근 방지
        secure: false,        // HTTPS 환경에서만 작동 (로컬 개발 환경에서는 false)
        sameSite: 'none' // Cross-Origin 허용
    }
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true               // 쿠키를 포함하도록 설정
}));


// 라우터 분리 설정
app.use('/main', routerController.mainRouter)
app.use('/board', routerController.boardRouter)
app.use('/auth', routerController.authRouter)

// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);


// -------------------------------------------------
// 사용자 정의
const lg = console.log;


// -------------------------------------------------
// API
app.get('/', function (요청, 응답) {
    응답.sendFile(path.join(process.cwd(), '/index.html'));
});


app.listen(80, function () {
    console.log("start! express server on port 80")
})


// 키페어 권한수정 chomod 400 에러 해결법 https://dabid.tistory.com/11
