const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const app = express();
const imageDownloader = require('image-downloader');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Booking = require('./models/Booking.js');
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'gkgdjdgdjgr';
const serverBaseUrl = 'http://localhost:4000';

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.use(express.json());
app.use(cookieParser());
const imageDirectory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(imageDirectory));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

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
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

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

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      return res.status(404).json({ error: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, userDoc.password);

    if (passwordMatch) {
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id,
        name: userDoc.name
      },
        jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
          return res.status(200).json({ message: 'Login successful' });
        });

    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { name, email, _id } = await User.findById(userData.id);
    res.json({ name, email, _id });
  });
});

app.post('/logout', async (req, res) => {
  try {
    res.clearCookie('token');
    res.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });
  res.json(newName);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  }
});

const photosMiddleware = multer({ storage: storage });

app.post('/upload', photosMiddleware.array('photos', 20), (req, res) => {
  const uploadedFiles = req.files.map(file => file.filename);
  res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos.map(photo => `http://www.localhost:4000/uploads/${photo}`),
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put('/places'), async (req, res) => {
  const {token} = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
} = req.body;
jwt.verify(token, jwtSecret, {}, async (err, userData) => {
  const placeDoc = await Place.findById(id);
  if(userData.id === placeDoc.owner) {
    placeDoc.set({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos.map(photo => `http://www.localhost:4000/uploads/${photo}`),
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    placeDoc.save();
  }
    });
  }

  app.put('/places/:id', async (req, res) => { // Note the corrected URL for the endpoint
    const { token } = req.cookies;
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      const placeDoc = await Place.findById(id);
      if (userData.id === placeDoc.owner) {
        placeDoc.set({
          owner: userData.id,
          title,
          address,
          photos: addedPhotos.map(photo => `http://localhost:4000/uploads/${photo}`), // Correct the URL here
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price
        });
        await placeDoc.save(); // Make sure to use await here to wait for the save operation to complete
      }
    });
  });
  
  app.get('/places' , async (req, res) => {
res.json ( await Place.find() );
  })

  app.post('/booking', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {
      place,
      checkInDate,
      checkOutDate,
      name,
      phone,
      totalPrice,
    } = req.body;
  
    Booking.create({
      place,
      checkInDate,
      checkOutDate,
      name,
      phone,
      totalPrice, 
      user:userData.id,
    })
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        console.error("Error occurred while creating booking:", err);
        res.status(500).json({ error: "An error occurred while processing the reservation." });
      });
  });

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async(err, userData) => {
      if (err) {
        console.error("Error occurred while verifying token:", err);
        reject(err);
      } else {
      resolve(userData);
      }
  }) 
  })
}


  app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const bookings = await Booking.find({ user: userData.id }).populate('place');
    res.json(bookings);
  })