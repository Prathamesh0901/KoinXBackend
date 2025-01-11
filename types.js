const zod = require('zod');

const coinDataSchema = zod.object({
    id: zod.string().min(1, "Coin ID is required!"),
    symbol: zod.string().min(1, "Coin symbol is required!"),
    name: zod.string().min(1, "Coin name is required!"),
    price: zod.object({
        inr: zod.number().nonnegative("Price in INR cannot be negative!"),
        usd: zod.number().nonnegative("Price in USD cannot be negative!")
    }),
    market_cap: zod.object({
        inr: zod.number().nonnegative("Price in INR cannot be negative!"),
        usd: zod.number().nonnegative("Price in USD cannot be negative!")
    }),
    change24h: zod.number(),
});

module.exports = {
    coinDataSchema
};