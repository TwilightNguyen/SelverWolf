//const express = require('express');
//const router = express.Router();
const router = new Bun.FileSystemRouter({
dir:'/routes',
    style:'nextjs',
    origin:'https://mydomain.com',
    assetPrefix: '_next/static/'
});

const userController = require('../app/controllers/UserController');

router.match("/");

{
}
// router.use('/login', userController.login);
// router.use('/signup', userController.signup);
// router.use('/', userController.index);

module.exports = router;
