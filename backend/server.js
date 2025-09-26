require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shortid = require('shortid');
const Url = require('./models/url');

const app = express();
const PORT = process.env.PORT || 5001;

// This explicit configuration is the most robust way to handle CORS.
const corsOptions = {
    origin: 'http://localhost:4200', // Allow only your Angular app
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// This middleware must come after CORS but before your routes.
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- API ROUTES ---

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
    const shortUrl = `http://localhost:${PORT}/${shortCode}`;

    try {
        let url = await Url.findOne({ originalUrl });
        if (url) {
            res.status(200).json({ ...url.toObject(), shortUrl: `http://localhost:${PORT}/${url.shortCode}` });
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