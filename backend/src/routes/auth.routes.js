const { Router } = require('express');
const { userRegisterController, userLoginController, getUserProfile } = require('../controllers/auth.controller');
const authenticateToken = require('../middleware/auth.middleware');
const authRouter = Router();

authRouter.post('/register', userRegisterController);
authRouter.post('/login', userLoginController);
authRouter.get('/profile', authenticateToken, getUserProfile)

module.exports = authRouter;
