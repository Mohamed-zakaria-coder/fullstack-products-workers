const express = require('express');
const authController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Public route (signup)
router.post('/signup', authController.signup);

// Public route (login)
router.post('/login', authController.login);

// Protected route (example)
router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
