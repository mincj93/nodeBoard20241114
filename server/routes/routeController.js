const routerController = {};

routerController.boardRouter = require('./routers/boardRouter.js');
routerController.mainRouter = require('./routers/mainRouter.js');
routerController.authRouter = (passport, LocalStrategy) => require('./routers/authRouter.js')(passport, LocalStrategy); // 다른 컨트롤러와 다르게 passport를 app.js 에서부터 차례대로 내려받았는데, 사용하려면 이와 같은 형식의 함수로 받아야 한다.

module.exports = routerController;