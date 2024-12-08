// -------------------------------------------------
// 모듈
const express = require('express');
const path = require('path')
const router = express.Router();
const dotenv = require("dotenv").config();
const routerController = require('./server/routes/routeController.js');
const { stringify } = require('querystring');
const bodyParser = require('body-parser');
const cors = require('cors');


// -------------------------------------------------
// express 설정
const app = express();
// app.use(express.static(path.join(process.cwd(), '/front/nodeblog/build'))); // react 프론트 경로 연결 1
app.use(express.static(path.join(__dirname, '/public/build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// 세션 설정 필요요소
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')

app.use(passport.initialize())
app.use(session({
    secret: 'AlsCkd!@34', // 이 비밀번호 털리면 내 사이트 털림
    resave: false, // 서버에 요청시마다 갱신할 것인지? (보통 false)
    saveUninitialized: false // 로그인 안 해도 세션을 생성할지? (보통 false)
}))

app.use(passport.session())
// 세션 설정 필요요소 끝


// 라우터 분리 설정
app.use('/main', routerController.mainRouter)
app.use('/board', routerController.boardRouter)
app.use('/auth', routerController.authRouter(passport, LocalStrategy))

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
