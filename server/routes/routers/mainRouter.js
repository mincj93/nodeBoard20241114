// -------------------------------------------------
// 내장함수
const express = require('express');
const path = require('path')
const router = express.Router();

// -------------------------------------------------
// 기능함수
const mysqlConn = require(process.cwd() + '/server/mysql/mysqlConn');
const boardQuery = require(process.cwd() + '/server/mysql/query/boardQuery');


// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();

// -------------------------------------------------
// express 설정
app.use(express.static(path.resolve(process.cwd() + '/public')));

// -------------------------------------------------
// 변수들
const lg = console.log;

module.exports = router;
