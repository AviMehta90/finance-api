const express = require('express');
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
    console.log("Response sent status");
});

app.get("/fetch-stock-data", (request, response) => {
    

});
