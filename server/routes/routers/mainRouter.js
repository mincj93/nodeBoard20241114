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

router.get('/about', (req, res) => {
    lg('/main/about')
    const data = {
        navLoc: path.resolve(process.cwd() + '/front/common/nav.ejs'),
    };
    res.render(path.join(mainPagePath, '/about'), { data: data });
})

router.get('/contact', (요청, 응답) => {
    lg('/main/contact')
    응답.render(path.join(mainPagePath, '/contact'))
})

router.get('/post', (요청, 응답) => {
    lg('/main/post')
    응답.render(path.join(mainPagePath, '/post'))
})

module.exports = router;
