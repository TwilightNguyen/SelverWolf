
// const newsRouter = require('./news');
// const siteRouter = require('./site');
const userRouter = require('./user');

function route(app) {
    app.use('/api/user', userRouter);
    // app.use('/api/news', newsRouter);
    //app.use('/api/', siteRouter);
}

module.exports = route;
