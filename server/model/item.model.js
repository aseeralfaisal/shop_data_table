const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String, required: true },
    created_by: { type: String, required: true },
}, {
    timestamps: {
        createdAt: 'created_at',
    },
}, { _id: false })

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;