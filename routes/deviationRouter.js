const express = require('express');
const { CryptoSchema } = require('../db/Schema');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();

const mean = (data) => {
    let sum = 0;
    for(let d of data) sum += d;
    return sum/data.length;
}

const calculate = (data) => {
    let u = mean(data);
    let squaredSum = 0;
    for(let d of data) {
        squaredSum += ((d-u)*(d-u));
    }
    let sd = Math.sqrt(squaredSum/data.length);
    return sd;
}

const calculateSD = (data) => {
    var inr = [];
    var usd = [];
    for(let d of data) {
        inr.push(d.price.inr);
        usd.push(d.price.usd);
    }
    return {
        inr: calculate(inr),
        usd: calculate(usd)
    }
}

router.get('/', async (req, res) => {
    try {
        let data = {};
        const {id, name, symbol} = req.query;
        console.log(req.query);
        if(id) {
            data = await CryptoSchema.find({id}).sort({createdAt: 'desc'}).limit(100);
        }
        else if(name) {
            data = await CryptoSchema.find({name}).sort({createdAt: 'desc'}).limit(100);
        }
        else if(symbol) {
            data = await CryptoSchema.find({symbol}).sort({createdAt: 'desc'}).limit(100);
        }
        if(!data) {
            res.status(StatusCodes.OK).json({
                error: 'Insufficient data! Try later!'
            });
        }
        console.log(data);
        const standardDeviation = calculateSD(data);
        const finalData = {
            id: data.id,
            deviation: standardDeviation
        }
        res.status(StatusCodes.OK).json({
            data: finalData
        });
    } catch(err) {
        console.log('Error calculating deviation: ', err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: err.message
        });
    }
});

module.exports = {
    DeviationRouter: router
}