const express = require('express');
const path = require('path')
const router = express.Router();

// import
const boardRouter = require('./server/routes/boardRouter.js');
const mainRouter = require('./server/routes/mainRouter.js');


// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();


// -------------------------------------------------
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);



// -------------------------------------------------
// express 설정
app.use(express.static(path.join(__dirname ,'/public')));


// 라우터
app.use('/main', mainRouter)
app.use('/board', boardRouter)




// -------------------------------------------------
// 변수들
const lg = console.log;
const indexPath = __dirname + '/front';


// -------------------------------------------------
// API
app.get('/', (req, res) => {
    res.render(path.join(indexPath, '/index'));
})

// 3000 포트로 서버 오픈
app.listen(8080, function () {
    console.log("start! express server on port 8080")
})

// 이제 터미널에 node app.js 를 입력해보자.