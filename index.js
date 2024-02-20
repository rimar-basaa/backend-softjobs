const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');
const reporteConsulta = require('./middleware/reporteConsulta');
const morgan = require('morgan');

//Middleware
app.use(express.json());
app.use(cors());
//app.use(morgan('dev'));

//Routes
app.use("/", reporteConsulta, routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`servidor corriendo... en puerto:${PORT}`));