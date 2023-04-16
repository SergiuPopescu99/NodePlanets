const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    mission: "Kepler Exploration X",
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27,2030'),
    target: "Kepler-442 b",
    flightNumber: 100,
    customers: ['NASA', 'UPT'],
    upcoming: true,
    success: true,

};
launches.set(launch.flightNumber, launch);
function existsLaunchWithId(launchId) {
    return launches.has(launchId)
}
function getAllLaunches() {
    return Array.from(launches.values());

}
function addNewLaunch(launch) {
    latestFlightNumber++;

    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ['NASA', 'ZTM'],
        upcoming: true,
        success: true
    }));
}
function abortLaunchById(id) {
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}
  
module.exports = { launches, getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById };