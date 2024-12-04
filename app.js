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


// 라우터 분리 설정
app.use('/main', routerController.mainRouter)
app.use('/board', routerController.boardRouter)
app.use('/user', routerController.userRouter)

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
