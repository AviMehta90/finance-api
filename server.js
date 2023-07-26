const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.get("/status", (request, response) => {
const status = {
    "Status": "Running"
};
    response.send(status);
});

function getStockInfo() {
  const url = process.env.SYMBOLS_URL;

  return axios
    .get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const symbols = [];
      const names = [];

      $('table.wikitable tbody tr').each((i, element) => {
        if (i < 11) {
          var symbol = $(element).find('td:nth-child(1)').text();
          symbol = symbol.substring(0, symbol.length-1);
          const name = $(element).find('td:nth-child(2)').text();
          symbols.push(symbol);
          names.push(name);
        }
      });

      var imp_infoList = symbols.map((symbol, i) => [i, symbol, names[i]]);
      var first = imp_infoList.shift();
      return imp_infoList;
    })
    .catch((error) => {
      console.error('Error fetching stock information:', error.message);
      return [];
    });
}

async function get_data(stock) {
  const idx = stock[0];
  const sym = stock[1];
  const name = stock[2];

  const url = `https://${process.env.API_URL}/api/yahoo/hi/history/${sym}/1d`;
  const querystring = { diffandsplits: 'false' };

  const headers = {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': process.env.API_URL,
  };

  try {
    const response = await axios.get(url, { headers, params: querystring });
    const response_data = response.data;
    const hist_data = response_data.items;

    if (!hist_data) {
      console.log(`Error: No data found for stock ${sym}`);
      return null;
    }

    const hist_data_keys = Object.keys(hist_data);
    const day_before_key = hist_data_keys[hist_data_keys.length - 2];
    const today_key = hist_data_keys[hist_data_keys.length - 1];

    const day_before_price = hist_data[day_before_key].close;
    const today_price = hist_data[today_key].close;
    const market_cap = hist_data[today_key].volume;

    const data = {
      stock_id: idx,
      name,
      symbol: sym,
      current_price: today_price,
      day_before_price,
      market_cap,
    };

    return data;
  } catch (error) {
    console.log(`Error occurred while processing stock ${sym}: ${error.message}`);
    return null;
  }
}

async function driver() {
  try {
    const stock_info = await getStockInfo();
    const info_list = await Promise.all(stock_info.map(get_data));
    const valid_info_list = info_list.filter((info) => info !== null);
    return valid_info_list;
  } catch (error) {
    console.log('Error occurred:', error.message);
    return [];
  }
}

async function main() {
  // const start = Date.now();
  const result = await driver();
  const json_object = JSON.stringify(result, null, 3);
  // console.log('The request time is:', (Date.now() - start) / 1000, 'seconds');
  return json_object;
}


app.get("/fetch-stock-data", (request, response) => {

  main().then((obj) => {
    response.send(obj);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

});
