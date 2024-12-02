const express = require('express');
const axios = require('axios');
const app = express();

const SERVICES = {
    itemService: 'http://item-service:3001',
    reviewService: 'http://review-service:3002',
};

app.use(express.json());

// Forward requests to item service
app.use('/api/items', async (req, res) => {
    const url = `${SERVICES.itemService}/items${req.url}`;
    try {
        const response = await axios({
            method: req.method,
            url,
            data: req.body,
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Service unavailable' });
    }
});

// Forward requests to review service
app.use('/api/reviews', async (req, res) => {
    const url = `${SERVICES.reviewService}/reviews${req.url}`;
    try {
        const response = await axios({
            method: req.method,
            url,
            data: req.body,
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Service unavailable' });
    }
});

app.listen(3000, () => {
    console.log('API Gateway running on http://localhost:3000');
});