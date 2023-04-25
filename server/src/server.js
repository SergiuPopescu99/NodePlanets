
const app = require('./app')
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');
const PORT = process.env.PORT || 9000;


const http = require('http');

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchesData();
    server.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });

}


startServer();




