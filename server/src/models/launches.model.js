const launches = new Map();


const launch = {
    mission: "Kepler Exploration X",
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27,2030'),
    destination: "Kepler-442 b",
    flightNumber: 100,
    customers: ['NASA', 'UPT'],
    upcoming: true,
    success: true,

}
function getAllLaunches() {
    return Array.from(launches.values());

}
launches.set(launch.flightNumber, launch);
module.exports = { launches, getAllLaunches };