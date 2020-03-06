// Load base configuration (process.env bindings)
require('./config/config');

const express = require('express');
const app = express();

const port = process.env.PORT;

// Serve webapp with root route so that it can be consumed like "http://localhost/index.html"
app.use('/', express.static(process.env.UI_DIR));


app.listen(port, () => console.log(`Express server started at port: ${port}`));