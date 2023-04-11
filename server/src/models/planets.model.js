const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
// parse();
fs.read
const habitablePlanets = []


function isHabitable(planet) {

    return planet['koi_disposition'] === "CONFIRMED"
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;


}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data/kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,

            }))
            //parsed data
            .on('data', (data) => {
                if (isHabitable(data)) {
                    habitablePlanets.push(data);
                }

            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                console.log(`Length of the array is ${habitablePlanets.length} habitable planets`)

                console.log(habitablePlanets.forEach((p) => { console.log(p['kepler_name']) }))
                resolve();
            });

    });



}
function getAllPlanets() {
    return habitablePlanets;
};



module.exports = {
    loadPlanetsData,
    getAllPlanets
}
