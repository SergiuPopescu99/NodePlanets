const app = require('./app')
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 9000;
const http = require('http');
const server = http.createServer(app);
async function startServer() {

    await loadPlanetsData();
    server.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });

}


startServer();




