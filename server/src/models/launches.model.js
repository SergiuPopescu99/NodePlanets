const launches = new Map();

let latestFlightNumber = 100;

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
function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, launch);
    launches.set(launch.flightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ['NASA', 'ZTM'],
        upcoming: true,
        success: true
    }));
}

module.exports = { launches, getAllLaunches, addNewLaunch };