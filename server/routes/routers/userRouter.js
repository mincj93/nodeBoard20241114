// -------------------------------------------------
// 내장함수
const express = require('express');
const path = require('path')
const router = express.Router();

// -------------------------------------------------
// 기능함수
const mysqlConn = require(process.cwd() + '/server/mysql/mysqlConn');
const userQuery = require(process.cwd() + '/server/mysql/query/userQuery');


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
const userPagePath = path.resolve(process.cwd() + '/front/user');


// 로그인 페이지
router.get('/login', (req, res) => {
    lg('/user/login')
    lg('req.body == ', req.body)
    const data = {
        navLoc: path.resolve(process.cwd() + '/front/common/nav.ejs'),
    };
    res.render(path.join(userPagePath, '/login'), { data: data });
})

// 로그인
router.post('/login', async (req, res) => {
    lg('/user/login')
    const reqBody = req.body;
    lg('req.body == ', reqBody?.userId, reqBody?.userPw);

    const result = await mysqlConn.connectDb(userQuery.getUser, [reqBody?.userId, reqBody?.userPw]);
    lg('\n\nresult == ', result , reqBody);

    const data = {
        navLoc: path.resolve(process.cwd() + '/front/common/nav.ejs'),
    };
    res.render(path.join(userPagePath, '/login'), { data: data });
})

module.exports = router;
