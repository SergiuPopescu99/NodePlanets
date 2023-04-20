const app = require('./app')
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 9000;
const MONGO_URL = "mongodb+srv://nasa-api:QqcoIHF2f0jUNcIZ@cluster0.irz8zcy.mongodb.net/NASA?retryWrites=true&w=majority"

const http = require('http');
const mongoose = require('mongoose');
const server = http.createServer(app);
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});
mongoose.connection.on('error', (err) => { console.error(err); })
async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    server.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });

}


startServer();




