const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {
  signup: async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide all required fields.' });
    }
  
  
    try {
      // Create user without the password
      const user = await User.create({ name, email });
  
      // Retrieve the user from the database
      const userInstance = await User.findById(user._id);
  
      // Hash the password
      await userInstance.hashPassword(password);
  
      // Save the updated user with the hashed password
      await userInstance.save();
  
      res.json({ success: true, user: userInstance });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  },
  
  login: async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password.' });
  } 
  try {
    const user = await User.findOne({ email });

    if (user) {
      const passwordMatch = await user.comparePassword(password);

      if (passwordMatch) {
        const token = jwt.sign({ userId: user._id }, 'try');
        res.json({ user, token });
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

};

module.exports = authController;
