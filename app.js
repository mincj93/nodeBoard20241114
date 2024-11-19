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
        lg('데이터베이스 조회 중 오류가 발생했습니다.');

        const data = {
            navLoc: path.resolve(process.cwd() + '/front/common/nav.ejs'),
            myName: "민창준입니다"
        };
        res.send('데이터조회 중 오류가 발생했습니다.');
    }
});


app.listen(8080, function () {
    console.log("start! express server on port 8080")
})

// AWS 배포과정 https://velog.io/@fkstndnjs/%EB%85%B8%EB%93%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-AWS%EC%97%90-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0-ec2-rds
// 키페어 권한수정 chomod 400 에러 해결법 https://dabid.tistory.com/11
/*
use node;

-- node.board definition

CREATE TABLE `board` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` varchar(100) NOT NULL,
  `regdt` datetime NOT NULL DEFAULT current_timestamp(),
  `regid` varchar(100) NOT NULL,
  PRIMARY KEY (`idx`)
);

INSERT INTO board (title, content, regid) values ('제목1', '내용1',1);

select * from board;

commit;

HOST=nodeworld-mysql.cbyoxjoh8vrf.ap-northeast-2.rds.amazonaws.com
PORT=3306
USER="admin"
PASSWORD="AlsCkd!23"
DATABASE="node"
*/