const express = require('express');
const router = require('./routeHandler');

const app = express();

// const data = require('./dataProvider');

// app.get('/', (req, res) => {
//     res.json(data);
// })

app.use('/', router);

let port = 8080;
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})