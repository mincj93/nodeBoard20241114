// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require('express');
const path = require('path')
const router = express.Router();

// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();

app.use(express.static(path.resolve(process.cwd() + '/public')));

const boardPagePath = path.resolve(process.cwd() + '/front/board');
router.get('/list', (요청, 응답) => {
   응답.render('')
})

module.exports = router;
