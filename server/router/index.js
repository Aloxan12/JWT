const Router = require('express').Router;
const userController = require('../controllers/user-controller')
const postController = require('../controllers/post-controller')
const fileController = require('../controllers/file-controller')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

const router = new Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users',authMiddleware, userController.getUsers);
router.get('/user/:id',authMiddleware, userController.getUserDetail);
router.patch('/user/:id',authMiddleware, userController.updateUserDetail);
router.post('/user/:id/uploadAvatar', userController.uploadUserAvatar);

router.get('/posts', authMiddleware, postController.getPosts);
router.post('/posts', postController.createPosts);
router.delete('/posts/:id', postController.deletePost);

router.post('/upload', fileController.uploadFile )


module.exports = router