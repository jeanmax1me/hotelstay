const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.get('/test' , (req, res) => {
    res.json ('FUCK YOU WORLD OMG');
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});