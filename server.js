const express = require('express');
const { cronJob } = require('./jobs/job');
require('dotenv').config({
    path: './.env'
});
const PORT = process.env.PORT || 3000
const app = express();

cronJob.start();

app.get('/', (req, res) => {
    res.json({
        msg: 'Hi'
    });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});