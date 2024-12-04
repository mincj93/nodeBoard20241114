// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require('express');
const path = require('path')
const router = express.Router();
const query = require(process.cwd() + '/server/mysql/query/boardQuery')

// -------------------------------------------------
// 기능함수
const lg = console.log;
const mysqlConn = require(process.cwd() + '/server/mysql/mysqlConn');

// 최신 등록 5개
router.get('/getBrdLast5', async (요청, 응답) => {
   // preparedStatement 형식 쿼리에 인자 보내는 방법
   // const result = await mysqlConn.connectDb(쿼리, [인자 순서대로 배열로 보내야함]);
   // ex) const result = await mysqlConny.connectDb(userQuery.getUser, [reqBody?.userId, reqBody?.userPw]);
   const listData = await mysqlConn.connectDb(query.getBrdLast5);
   lg('검색 결과 == ', listData)
   응답.send(listData);
})

// 전체목록
router.get('/getAllBrdList', async (요청, 응답) => {
   const listData = await mysqlConn.connectDb(query.getAllBrdList);
   lg('검색 결과 == ', listData)
   응답.send(listData);
})


// 5개씩 페이징
router.post('/getBrdListPaging', async (요청, 응답) => {
   lg('요청 == ', 요청.body);
   const { pageNum, cntPerPage } = 요청.body;
   const listData = await mysqlConn.connectDb(query.getBrdListPaging, [pageNum, cntPerPage]);
   lg('검색 결과 == ', listData)
   응답.send(listData);
})

// 5개씩 페이징
router.post('/getBrdDtl', async (요청, 응답) => {
   lg('요청 == ', 요청.body);
   const { idx } = 요청.body;
   const listData = await mysqlConn.connectDb(query.getBrdDtl, [idx]);
   lg('검색 결과 == ', listData)
   응답.send(listData);
})


// 게시물 등록
router.post('/insertBrd', async (요청, 응답) => {
   lg('요청 == ', 요청.body);
   const reqData = 요청.body;
   try {
      await mysqlConn.connectDb(query.insertBrd, [reqData.title, reqData.content, reqData.regid]);
      lg('게시물 등록 성공')
      응답.send({ result: 'success' });
   } catch (err) {
      lg('게시물 등록 실패', err)
      응답.send({ result: 'fail' });
   }
})







module.exports = router;
