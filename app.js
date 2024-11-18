// -------------------------------------------------
// 모듈
const express = require('express');
const path = require('path')
const router = express.Router();
const dotenv = require("dotenv").config();
const routerController = require('./server/routes/routeController.js');
const { stringify } = require('querystring');

// -------------------------------------------------
const mysqlConn = require(process.cwd() + '/server/mysql/mysqlConn');
const query = require(process.cwd() + '/server/mysql/query/boardQuery')

// -------------------------------------------------
// express 설정
const app = express();
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

app.get('/', async (req, res) => {
    try {
        const listData = await mysqlConn.connectDb(query.getBrdRecent3);
        console.log('\n\n\n\n\n\n\n\n\n\n\n\nlistData == ', listData);

        const data = {
            navLoc: path.resolve(process.cwd() + '/front/common/nav.ejs'),
            myName: "민창준입니다",
            listData: listData,
        };

        res.render(path.join(frontPath, '/index'), { data: data });
    } catch (error) {
        console.error('DB 조회 중 오류 발생:', error);
        // 오류 처리 (예: 사용자에게 오류 메시지 표시)
        res.status(500).send('데이터베이스 조회 중 오류가 발생했습니다.');
    }
});


app.listen(8080, function () {
    console.log("start! express server on port 8080")
})

// 이제 터미널에 node app.js 를 입력해보자.