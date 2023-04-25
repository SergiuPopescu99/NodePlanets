const axios = require('axios');

const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')
const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    mission: "Kepler Exploration X",//"name"
    rocket: 'Explorer IS1', //rocket.name
    launchDate: new Date('December 27,2030'),//"date_local"
    target: "Kepler-442 b", //not applicable
    flightNumber: 100, //flight_number
    customers: ['NASA', 'UPT'],//Getting from populating payloads(array)
    upcoming: true,
    success: true,

};
// launches.set(launch.flightNumber, launch);
saveLaunch(launch);

async function loadLaunchesData() {

    const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

    console.log('Downloading launch data');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [{
                path: 'rocket',
                select: {
                    name: 1
                }
            },
            {
                path: 'payloads',
                select: {
                    customers: 1
                }
            }
            ]
        }
    });
    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => { return payload['customers'] })
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            success: launchDoc['success'],
            customers,

        };
        console.log(`${launch.flightNumber} ${launch.mission}`)
    }
}




async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({ flightNumber: launchId });
}
async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase.findOne()
        .sort('-flightNumber');
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;

}
async function getAllLaunches() {
    return await launchesDatabase
        .find({}, { '__id': 0, '__v': 0 });

}
async function saveLaunch(launch) {
    const planet = await planets.findOneAndUpdate({ keplerName: launch.target });
    if (!planet) {
        throw new Error('No matching kepler planet found!  ')

    }
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber
    }, launch, { upsert: true });

}

async function scheduleNewLaunch(launch) {

    const latestFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['NASA', 'UPT'],
        flightNumber: latestFlightNumber
    });
    await saveLaunch(newLaunch);

}
async function abortLaunchById(id) {

    const aborted = await launchesDatabase.updateOne({ flightNumber: id }, {
        upcoming: false,
        success: false
    });
    return aborted.modifiedCount === 1;
}

module.exports = { launches, loadLaunchesData, getAllLaunches, scheduleNewLaunch, existsLaunchWithId, abortLaunchById };