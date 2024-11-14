// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require('express');
const path = require('path')
const router = express.Router();

// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();


// -------------------------------------------------
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// -------------------------------------------------
// express 설정
// app.use(express.static(__dirname + '../../../public'));

// -------------------------------------------------
// 변수들
const lg = console.log;
const mainPage = __dirname + '../../../front/main';

// lg('__dirname =  ', __dirname);

router.get('/about', (요청, 응답) => {
    lg('aseaseg')
    응답.render(path.join(mainPage, '/about'))
})


module.exports = router;
