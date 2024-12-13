const routerController = {};

routerController.boardRouter = require('./routers/boardRouter.js');
routerController.mainRouter = require('./routers/mainRouter.js');
routerController.authRouter = require('./routers/authRouter.js')

module.exports = routerController;