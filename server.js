const express = require('express');
const process = require('node:process');
const { StatsRouter } = require('./routes/statsRouter');
const { DeviationRouter } = require('./routes/deviationRouter');
const { cronJob } = require('./jobs/job');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config({
    path: './.env'
});
const PORT = process.env.PORT || 3000
const app = express();

cronJob.start();

app.get('/', (req, res) => {
    res.status(StatusCodes.OK).send(`
        <html>
            <head>
                <title>Welcome to Crypto Stats API</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 0;
                        padding: 20px;
                        background-color: #f4f4f9;
                        color: #333;
                    }
                    h1 {
                        color: #222;
                    }
                    pre {
                        background: #f0f0f0;
                        padding: 10px;
                        border-radius: 5px;
                        overflow-x: auto;
                    }
                    .endpoint {
                        margin-bottom: 20px;
                    }
                    .coins {
                        background: #fff3cd;
                        padding: 10px;
                        border-left: 4px solid #ffeeba;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <h1>Welcome to Crypto Stats API</h1>
                <p>Use the following routes to interact with the API:</p>
                
                <div class="endpoint">
                    <h2>1. Get Latest Statistics</h2>
                    <p>Endpoint: <code>/stats</code></p>
                    <p>Example Requests:</p>
                    <pre>
http://localhost:8080/stats?id=bitcoin
http://localhost:8080/stats?name=Bitcoin
http://localhost:8080/stats?symbol=btc
                    </pre>
                </div>

                <div class="endpoint">
                    <h2>2. Get Price Deviation</h2>
                    <p>Endpoint: <code>/deviation</code></p>
                    <p>Example Requests:</p>
                    <pre>
http://localhost:8080/deviation?id=ethereum
http://localhost:8080/deviation?name=Ethereum
http://localhost:8080/deviation?symbol=eth
                    </pre>
                </div>

                <div class="coins">
                    <h2>Supported Coins</h2>
                    <ul>
                        <li>Bitcoin:
                            <ul>
                                <li><strong>Name:</strong> Bitcoin</li>
                                <li><strong>ID:</strong> bitcoin</li>
                                <li><strong>Symbol:</strong> btc</li>
                            </ul>
                        </li>
                        <li>Ethereum:
                            <ul>
                                <li><strong>Name:</strong> Ethereum</li>
                                <li><strong>ID:</strong> ethereum</li>
                                <li><strong>Symbol:</strong> eth</li>
                            </ul>
                        </li>
                        <li>Polygon:
                            <ul>
                                <li><strong>Name:</strong> Polygon</li>
                                <li><strong>ID:</strong> matic-network</li>
                                <li><strong>Symbol:</strong> matic</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </body>
        </html>
    `);
});


app.use('/stats', StatsRouter);
app.use('/deviation', DeviationRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});