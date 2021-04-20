const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const candidateSchema = Schema({
    name: {
        type: String,
        required: true
    },
    partyName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Candidates',candidateSchema);