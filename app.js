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
const mysqlConn = require(process.cwd() + '/server/mysql/mysqlConn');
const query = require(process.cwd() + '/server/mysql/query/boardQuery')

// -------------------------------------------------
// express 설정
const app = express();
// app.use(express.static(path.join(process.cwd(), '/front/nodeblog/build'))); // react 프론트 경로 연결 1
app.use(express.static(path.join(__dirname, '/public/build')));

// req 객체에서 body에 있는 값 받기위한것 >> express.json 으로 대체
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// 라우터 설정
app.use('/main', routerController.mainRouter)
app.use('/board', routerController.boardRouter)
app.use('/user', routerController.userRouter)

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


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

// AWS 배포과정 https://velog.io/@fkstndnjs/%EB%85%B8%EB%93%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-AWS%EC%97%90-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0-ec2-rds
// 키페어 권한수정 chomod 400 에러 해결법 https://dabid.tistory.com/11
