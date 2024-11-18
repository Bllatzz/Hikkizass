const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);
router.get('/users', authMiddleware, userController.getAllUsers);

module.exports = router;
