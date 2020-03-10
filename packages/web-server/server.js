// Load base configuration (process.env bindings)
require('./config/config');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT;

// Express Middleware ------------------------------------------------------------------
app.use(bodyParser.json());

// Rutas  Middleware -------------------------------------------------------------------

// Servir artefactos UI de manera estatica en el root para poder acceder como: "http://localhost/index.html"
app.use('/', express.static(process.env.UI_DIR));

// Habilitar router para Metas por Equipo
const RouterMetas = require('./routes/Metas');
app.use('/_api/v1', RouterMetas);


app.listen(port, () => console.log(`La aplicación express inicio en el puerto: ${port}`));