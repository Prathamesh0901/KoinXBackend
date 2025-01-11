const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        index: true
    },
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        inr: {
            type: Number,
            required: true,
            min: 0
        },
        usd: {
            type: Number,
            required: true,
            min: 0
        }
    },
    market_cap: {
        inr: {
            type: Number,
            required: true,
            min: 0
        },
        usd: {
            type: Number,
            required: true,
            min: 0
        }
    },
    change24h: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const CryptoSchema = mongoose.model('CryptoSchema', cryptoSchema);

module.exports = {
    CryptoSchema
};