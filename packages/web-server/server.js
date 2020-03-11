// Load base configuration (process.env bindings)
require('./config/config');
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT;

// -------------------------------------------------------------------------------------
// Express Middleware ------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// Parse all payloads as JSON objects
app.use(bodyParser.json());
// Log any income request
app.use((req, res, next) => {
  console.info(`${new Date()} - ${req.method} ${req.originalUrl}`);
  next();
})


// -------------------------------------------------------------------------------------
// Rutas  Middleware -------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// Serve UI Artifacts in the root of Express so that it can be accessed as: "http://localhost/index.html"
app.use('/', express.static(process.env.UI_DIR));

// Habilitar router para Metas por Equipo
const TeamGoalsRouter = require('./endpoints/TeamGoals');
app.use('/_api/v1', TeamGoalsRouter);




app.listen(port, () => console.log(`Application started at port: ${port}`));