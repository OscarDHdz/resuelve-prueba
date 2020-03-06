const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('../ui/out'));

app.listen(port, () => console.log(`Express server started at port: ${port}`));