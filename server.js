const express = require('express');
require('dotenv').config()
const PORT = process.env.PORT || 3000
const app = express();

app.get('/', (req, res) => {
    res.json({
        msg: 'Hello'
    });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});