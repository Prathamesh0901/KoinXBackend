# KoinX Backend Internship Assignment

## Overview
This repository implements the tasks for the KoinX Backend Internship Assignment. The project includes features for fetching cryptocurrency data, storing it in a MongoDB database, and providing APIs to retrieve statistics and calculate price deviation for the supported cryptocurrencies.

---

## Features

1. **Background Job**:
   - Fetches the current price (USD/INR), market cap (USD/INR), and 24-hour change percentage of Bitcoin, Ethereum, and Matic every two hours.
   - Stores the data in MongoDB.

2. **APIs**:
   - `/stats`: Returns the latest statistics for a cryptocurrency based on its `id`, `name`, or `symbol`.
   - `/deviation`: Calculates and returns the standard deviation of the price for the last 100 records of a cryptocurrency.

---
### Instructions for Users
---
To interact with the API, use the following endpoints:

1. **Get Latest Statistics**:
   - Endpoint: `/stats`
   - Example Requests:
     - `http://localhost:8080/stats?id=bitcoin`
     - `http://localhost:8080/stats?name=Bitcoin`
     - `http://localhost:8080/stats?symbol=btc`

2. **Get Price Deviation**:
   - Endpoint: `/deviation`
   - Example Requests:
     - `http://localhost:8080/deviation?id=ethereum`
     - `http://localhost:8080/deviation?name=Ethereum`
     - `http://localhost:8080/deviation?symbol=eth`

---


## Technology Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose ODM)
- **Zod** (for data validation)
- **node-cron** (for scheduling jobs)
- **dotenv** (for environment variable management)

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   API_KEY=<your_coin_gecko_api_key>
   MONGO_URI=<your_mongodb_connection_string>
   PORT=8080
   ```

4. Start the application:
   ```bash
   npm start
   ```

---

## Endpoints

### 1. `/stats`
- **Method**: `GET`
- **Description**: Returns the latest statistics for a cryptocurrency.
- **Query Parameters**:
  - `id`: (Optional) Cryptocurrency ID (e.g., `bitcoin`).
  - `name`: (Optional) Cryptocurrency name (e.g., `Bitcoin`).
  - `symbol`: (Optional) Cryptocurrency symbol (e.g., `btc`).
- **Response**:
  ```json
  {
    "price": { "inr": 8061615, "usd": 93566 },
    "marketCap": { "inr": 159690366282639, "usd": 1853415195268 },
    "change24h": -0.57376
  }
  ```

### 2. `/deviation`
- **Method**: `GET`
- **Description**: Calculates and returns the standard deviation of the price for the last 100 records of a cryptocurrency.
- **Query Parameters**:
  - `id`: (Optional) Cryptocurrency ID (e.g., `bitcoin`).
  - `name`: (Optional) Cryptocurrency name (e.g., `Bitcoin`).
  - `symbol`: (Optional) Cryptocurrency symbol (e.g., `btc`).
- **Response**:
  ```json
  {
    "deviation": "4082.48"
  }
  ```

---

## How It Works

### Background Job
- **Scheduler**: The `node-cron` library runs a job every 2 hours to fetch cryptocurrency data from the [CoinGecko API](https://www.coingecko.com/en/api/documentation).
- **Data Storage**: The fetched data is validated against a schema (using Zod) and stored in MongoDB.

### MongoDB Schema
- **Collection**: `CryptoSchema`
- **Schema Definition**:
  ```javascript
  const cryptoSchema = new mongoose.Schema({
    id: { type: String, required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    price: {
      inr: { type: Number, required: true },
      usd: { type: Number, required: true },
    },
    market_cap: {
      inr: { type: Number, required: true },
      usd: { type: Number, required: true },
    },
    change24h: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  ```

---

## Development

### Folder Structure
```
|
│── jobs
│   └── job.js
│── db
│   └── Schema.js
│── routes
│   ├── statsRouter.js
│   └── deviationRouter.js
│── utils
│   └── validation.js
│── server.js
├── .env
├── package.json
└── README.md
```

### Running the Background Job
- The job runs automatically every 2 hours when the application is started. You can manually trigger it by running:
  ```bash
  node src/jobs/job.js
  ```

---
## License
This project is licensed under the [MIT License](LICENSE).
