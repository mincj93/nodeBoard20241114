// -------------------------------------------------
// 내장함수
const express = require('express');
const path = require('path')
const router = express.Router();

// -------------------------------------------------
// 기능함수
const mysqlConn = require(process.cwd() + '/server/mysql/mysqlConn');


// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();


// -------------------------------------------------
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// -------------------------------------------------
// express 설정
app.use(express.static(path.resolve(process.cwd() + '/public')));

// -------------------------------------------------
// 변수들
const lg = console.log;
const mainPagePath = path.resolve(process.cwd() + '/front/main');

// lg('__dirname =  ', __dirname);

router.get('/about', (요청, 응답) => {
    lg('/main/about')
    응답.render(path.join(mainPagePath, '/about'))
})

router.get('/contact', (요청, 응답) => {
    lg('/main/contact')
    응답.render(path.join(mainPage, '/contact'))
})

router.get('/post', (요청, 응답) => {
    lg('/main/post')
    응답.render(path.join(mainPage, '/post'))
})

router.get('/getData', (요청, 응답) => {
    let resutl = mysqlConn.test();
    응답.send(resutl);
})

module.exports = router;
