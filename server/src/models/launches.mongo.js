const monoose = require('mongoose');
const launchesSchema = new monoose.Schema({
    flightNumber: {
        type: Number,
        required: true,

    },
    launchDate: {
        type: Date,
        required: true
    },
    mission: {
        type: String,
        requried: true,
    },
    rocket:
    {
        type: String,
        required: true,
    },
    target: {
        type: String,


    },
    customers: [String],
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true
    }
})

//connects launches schema with the launches conllection
module.exports = monoose.model('Launch', launchesSchema);