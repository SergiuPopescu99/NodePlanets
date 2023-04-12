const { getAllLaunches, addNewLaunch, } = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}
function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate
        || !launch.target) {
        return res.status(400).json({
            error: "Missing required launch properties!",
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    //An implicit function will be called on launchDate (valueOf) which will transform it in Unix timestamp
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid launch date!",
        });
    }
    addNewLaunch(launch);
    return res.status(201).json(launch); //return so there is one response per controller

}


module.exports = { httpGetAllLaunches, httpAddNewLaunch };