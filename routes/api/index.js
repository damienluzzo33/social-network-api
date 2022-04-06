const apiRouter = require('express').Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

apiRouter.use("/users", userRoutes);
apiRouter.use("/thoughts", thoughtRoutes);

module.exports = apiRouter;