const express = require('express');
const db = require('./database');
const app = express();

app.use(express.json());

app.get('/items', (req, res) => {
    db.getItems((err, items) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(items);
    });
});

app.post('/items', (req, res) => {
    const { title, cost, description } = req.body;
    db.addItem(title, cost, description, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.listen(3001, () => {
    console.log('Item Service running on http://localhost:3001');
});