const express = require('express');

const planetsRouter = require('./routes/planets/planets.router')
const launchesRouter = require('./routes/launches/launches.router')

const path = require('path')
const app = express();
const cors = require('cors');
const morgan = require('morgan')
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(morgan('combined'))
app.use(express.json())
//serving the front end as a middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
//chain on middlewares
app.use(planetsRouter);
app.use(launchesRouter);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

module.exports = app;