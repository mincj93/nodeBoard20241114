// -------------------------------------------------
// 모듈
const express = require('express');
const path = require('path')
const router = express.Router();
const dotenv = require("dotenv").config();
const routerController = require('./server/routes/routeController.js');

const app = express();
// -------------------------------------------------
// express 설정
app.use(express.static(path.join(__dirname, '/public')));
// 라우터 설정
app.use('/main', routerController.mainRouter)
app.use('/board', routerController.boardRouter)

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


// -------------------------------------------------
// 사용자 정의
const lg = console.log;
const frontPath = path.resolve(process.cwd() + '/front');


// -------------------------------------------------
// API
app.get('/', (req, res) => {
    res.render(path.join(frontPath, '/index'), { myName: "민창준입니다" });
})

// 3000 포트로 서버 오픈
app.listen(8080, function () {
    console.log("start! express server on port 8080")
})

// 이제 터미널에 node app.js 를 입력해보자.