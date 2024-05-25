const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Endpoint for Bitcoin monthly data
app.get('/api/bitcoin-monthly', async (req, res) => {
    try {
        const response = await axios.get('https://api.upbit.com/v1/candles/months', {
            params: {
                market: 'KRW-BTC',
                count: 40
            }
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('API error for Bitcoin data');
    }
});

// Endpoint for Ethereum monthly data
app.get('/api/ethereum-monthly', async (req, res) => {
    try {
        const response = await axios.get('https://api.upbit.com/v1/candles/months', {
            params: {
                market: 'KRW-ETH',
                count: 40 // Adjust count if needed
            }
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('API error for Ethereum data');
    }
});

// Endpoint for Bitcoin weekly data
app.get('/api/bitcoin-weekly', async (req, res) => {
    try {
        const response = await axios.get('https://api.upbit.com/v1/candles/weeks', {
            params: {
                market: 'KRW-BTC',
                count: 160  // Fetches 1 year of weekly data
            }
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('API error for Bitcoin weekly data');
    }
});

// Endpoint for Ethereum weekly data
app.get('/api/ethereum-weekly', async (req, res) => {
    try {
        const response = await axios.get('https://api.upbit.com/v1/candles/weeks', {
            params: {
                market: 'KRW-ETH',
                count: 160  // Fetches 1 year of weekly data
            }
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('API error for Ethereum weekly data');
    }
});

// Endpoint for Bitcoin daily data
app.get('/api/bitcoin-daily', async (req, res) => {
    try {
        const response = await axios.get('https://api.upbit.com/v1/candles/days', {
            params: {
                market: 'KRW-BTC',
                count: 30
            }
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('API error for Bitcoin daily data');
    }
});

// Endpoint for Ethereum daily data
app.get('/api/ethereum-daily', async (req, res) => {
    try {
        const response = await axios.get('https://api.upbit.com/v1/candles/days', {
            params: {
                market: 'KRW-ETH',
                count: 30
            }
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('API error for Ethereum daily data');
    }
});



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});