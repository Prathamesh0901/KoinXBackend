var process = require('node:process');
const mongoose = require('mongoose');
const cron = require('node-cron');
const { CryptoSchema } = require('../db/Schema');
require('dotenv').config();
const dburl = process.env.DB_URL;
const key = process.env.API_KEY;
const URL = 'https://api.coingecko.com/api/v3/coins/';
const { coinDataSchema } = require('../types');

const coins = ['bitcoin', 'matic-network', 'ethereum'];

mongoose.connect(dburl)
    .then(() => console.log('Connected to DB!'))
    .catch((err) => console.log('Error connecting to DB: ', err.message));

const fetchData = async (id) => {
    try {
        const response = await fetch(URL+id, {
            method: 'get',
            headers: {
                application: 'application/json',
                x_cg_demo_api_key: key
            }
        });

        const data = await response.json();

        return data;
    } catch (err) {
        console.log(`Error fetching the data: ${err.message}`);
        return null;
    }
};

const processData = (data) => {
    const processedData = {
        id: data.id,
        symbol: data.symbol,
        name: data.name,
        price: {
            inr: data.market_data.current_price.inr,
            usd: data.market_data.current_price.usd
        },
        market_cap: {
            inr: data.market_data.market_cap.inr,
            usd: data.market_data.market_cap.usd
        },
        change24h: data.market_data.price_change_percentage_24h
    }
    return processedData;
};

const saveDB = async (data) => {
    try {
        const crypto = new CryptoSchema(data);
        await crypto.save();
        console.log('Data saved to DB!');
    } catch (err) {
        console.log('Error saving the data: ', err.message);
    }
};

const main = async () => {
    for(let id of coins) {
        const data = await fetchData(id);
        if(data) {
            try {
                const processedData = processData(data);
                const validateData = coinDataSchema.parse(processedData);
                console.log(validateData);
                await saveDB(processedData);
            } catch (err) {
                if(err.name === 'ZodError') {
                    console.log('Validation Error: ', err.errors);
                }
                else {
                    console.log('Processing Error: ', err.message);
                }
            }
        }
    }
};

const cronJob = cron.schedule('0 */2 * * *', async () => {
    console.log('Running background job: fetching cryptodata');
    try {
        await main();
        console.log('Job executed successfully!');
    } catch (err) {
        console.log('Error executing job: ', err.message);
    }
});

module.exports = {
    cronJob
};