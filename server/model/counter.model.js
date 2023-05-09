const mongoose = require('mongoose')

const counterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 1,
    }
})

const counter = mongoose.model('counter', counterSchema);

module.exports = counter;