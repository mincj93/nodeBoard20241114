const routerController = {};

routerController.boardRouter = require('./routers/boardRouter.js');
routerController.mainRouter = require('./routers/mainRouter.js');
routerController.userRouter = require('./routers/userRouter.js');

module.exports = routerController;