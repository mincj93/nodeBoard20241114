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
app.use(express.static(path.join(process.cwd(), '/front/nodeblog/build'))); // react 프론트 경로 연결 1
app.use(express.static(path.join(__dirname, '/public')));

// req 객체에서 body에 있는 값 받기위한것 >> express.json 으로 대체
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// CORS 설정을 더 구체적으로 정의
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://43.202.34.90',
            'http://localhost:80',
            // 필요한 도메인 추가
        ];
        
        // origin이 없거나(같은 도메인) 허용된 도메인인 경우
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
};

// CORS 미들웨어를 라우터보다 먼저 적용
app.use(cors(corsOptions));

// Express 미들웨어 순서 조정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공 설정
app.use(express.static(path.join(process.cwd(), '/front/nodeblog/build')));

// 라우터 설정
app.use('/main', routerController.mainRouter)
app.use('/board', routerController.boardRouter)
app.use('/user', routerController.userRouter)

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


// -------------------------------------------------
// 사용자 정의
const lg = console.log;


// Express 서버에 CORS 디버깅 미들웨어 추가
app.use((req, res, next) => {
    console.log('Request Origin:', req.headers.origin);
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    next();
});

// -------------------------------------------------
// API
app.get('/', function (요청, 응답) {
    lg(path.join(process.cwd(), '/front/nodeblog/build/index.html'));
    응답.sendFile(path.join(process.cwd(), '/front/nodeblog/build/index.html'));
});




app.listen(80, function () {
    console.log("start! express server on port 80")
})

// AWS 배포과정 https://velog.io/@fkstndnjs/%EB%85%B8%EB%93%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-AWS%EC%97%90-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0-ec2-rds
// 키페어 권한수정 chomod 400 에러 해결법 https://dabid.tistory.com/11
