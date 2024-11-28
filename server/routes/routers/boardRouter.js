// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require('express');
const path = require('path')
const router = express.Router();
const query = require(process.cwd() + '/server/mysql/query/boardQuery')

// -------------------------------------------------
// 기능함수
const mysqlConn = require(process.cwd() + '/server/mysql/mysqlConn');

// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();

app.use(express.static(path.resolve(process.cwd() + '/public')));

const boardPagePath = path.resolve(process.cwd() + '/front/board');
router.get('/getList', (요청, 응답) => {

   let result = mysqlConn.dataSelect();
   응답.render(path.join(boardPagePath + '/home', { result: result }));

})

router.get('/getBrdLast5', async (요청, 응답) => {
   // preparedStatement 형식 쿼리에 인자 보내는 방법
   // const result = await mysqlConn.connectDb(쿼리, [인자 순서대로 배열로 보내야함]);
   // ex) const result = await mysqlConn.connectDb(userQuery.getUser, [reqBody?.userId, reqBody?.userPw]);
   const listData = await mysqlConn.connectDb(query.getBrdLast5);
   응답.send( listData );

})

module.exports = router;
