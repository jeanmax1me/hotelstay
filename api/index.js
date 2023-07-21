const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js')
const app = express();
require('dotenv').config()

const bcryptSalt = bcrypt.genSaltSync(10);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

console.log(process.env)
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('TEEEEEESSSST');
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
          // User with the same email already exists
          return res.status(400).json({ error: 'Email already registered' });
        }
    
        // Create a new user and save it to the database
        const userDoc = await User.create({
          name,
          email,
          password: bcrypt.hashSync(password, bcryptSalt),
        });
    
        return res.status(200).json({ message: 'User registered successfully', user: userDoc });
      } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });