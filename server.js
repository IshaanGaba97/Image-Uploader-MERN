
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const path = require('path');
const cors = require('cors');
require('./db/connect');
const verifyToken = require('./middlewares/auth');
const Image = require('./models/image');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//api
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Define storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });


app.post('/upload', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newImage = new Image({
            filename: req.file.filename,
            user: req.userId
        });

        await newImage.save();

        res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/images/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        // Fetch images associated with the current user (assuming user ID is stored in req.userId)
        const images = await Image.find({ user: userId });
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
