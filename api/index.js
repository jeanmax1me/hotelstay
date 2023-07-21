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
   const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json({userDoc});
});