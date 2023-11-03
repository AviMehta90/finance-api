# Stock Data Fetcher

This is a simple Node.js application that fetches stock data using various APIs, processes the data, and provides it in a JSON format. It can be used to gather information about the top stocks in a specific market.

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js: You can download it from [nodejs.org](https://nodejs.org/).

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/avimehta90/finance-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd finance-api
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project's root directory with the following variables:

   - `PORT`: The port on which the server should run (e.g., `3000`).
   - `SYMBOLS_URL`: The URL for fetching the list of stock symbols.
   - `API_URL`: The URL for the stock data API.
   - `API_KEY`: Your API key for accessing the stock data.

5. Start the application:

   ```bash
   npm start
   ```

6. The server will be running at `http://localhost:3000` (or the port you specified).

## Endpoints

- **GET /status**: Check if the server is running.
- **GET /fetch-stock-data**: Fetch stock data and return it in JSON format.

## How It Works

1. The application fetches a list of stock symbols and names from the specified URL using Axios and Cheerio.

2. It then makes API requests for each stock symbol to obtain historical stock data.

3. The received data is processed, and for each stock, the following information is extracted:

   - Stock ID
   - Name
   - Symbol
   - Current Price
   - Price from the previous day
   - Market Cap

4. The processed data is returned as a JSON object.

## Usage

You can access the stock data by making a GET request to the `/fetch-stock-data` endpoint.

## Contributing

Feel free to contribute to this project by opening issues or pull requests. Your contributions are welcome!

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [Axios](https://axios-http.com/)
- [Cheerio](https://cheerio.js.org/)

Enjoy using this stock data fetching application! If you have any questions or run into any issues, please don't hesitate to reach out.
