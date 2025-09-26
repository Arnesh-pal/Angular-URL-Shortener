require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shortid = require('shortid');
const Url = require('./models/url');

const app = express();
const PORT = process.env.PORT || 5001;

// ========================================================================
// START: THE FINAL CORS FIX
// ========================================================================
// Define the list of allowed "guests" (origins)
const allowedOrigins = ['http://localhost:4200', 'https://surluu.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        // Check if the incoming origin is in our guest list
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// ========================================================================
// END: THE FINAL CORS FIX
// ========================================================================


// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- API ROUTES ---
// (The rest of your file remains the same)
// GET all URLs
app.get('/api/urls', async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        res.json(urls);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new URL
app.post('/api/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl) {
        return res.status(400).json({ message: 'originalUrl is required' });
    }
    const shortCode = shortid.generate();
    const shortUrl = `https://rshortr-url.vercel.app/${shortCode}`; // Use your live backend URL

    try {
        let url = await Url.findOne({ originalUrl });
        if (url) {
            res.status(200).json({ ...url.toObject(), shortUrl: `https://rshortr-url.vercel.app/${url.shortCode}` });
        } else {
            const newUrl = new Url({ originalUrl, shortCode });
            await newUrl.save();
            res.status(201).json({ ...newUrl.toObject(), shortUrl });
        }
    } catch (error) {
        console.error('Error in /api/shorten:', error);
        res.status(500).json({ message: 'Server error while shortening URL' });
    }
});

// GET and redirect
app.get('/:shortCode', async (req, res) => {
    try {
        const url = await Url.findOne({ shortCode: req.params.shortCode });
        if (url) {
            url.clicks++;
            await url.save();
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json('No URL found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));