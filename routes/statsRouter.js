const express = require('express');
const { CryptoSchema } = require('../db/Schema');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let data = {};
        const {id, name, symbol} = req.query;
        console.log(req.query);
        if(id) {
            data = await CryptoSchema.findOne({id}).sort({createdAt: 'desc'});
        }
        else if(name) {
            data = await CryptoSchema.findOne({name}).sort({createdAt: 'desc'});
        }
        else if(symbol) {
            data = await CryptoSchema.findOne({symbol}).sort({createdAt: 'desc'});
        }
        const finalData = {
            id: data.id,
            name: data.name,
            symbol: data.symbol,
            price: data.price,
            marketCap: data.market_cap,
            change24h: data.change24h
        }
        res.status(StatusCodes.OK).json({
            data: finalData
        });
    } catch(err) {
        console.log('Error fetching stats: ', err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: err.message
        });
    }
});

module.exports = {
    StatsRouter: router
}