const express = require('express');
const db = require('./database');
const app = express();

app.use(express.json());

app.get('/reviews', (req, res) => {
    db.getReviews((err, reviews) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(reviews);
    });
});

app.post('/reviews', (req, res) => {
    const { itemId, comment } = req.body;
    db.addReview(itemId, comment, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.listen(3002, () => {
    console.log('Review Service running on http://localhost:3002');
});