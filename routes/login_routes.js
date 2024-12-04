const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/login_controller');
const checkToken = require('../middlewares/login_middleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:id', checkToken, getUser);

module.exports = router;