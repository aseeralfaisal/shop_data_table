const mongoose = require('mongoose')
const counter = require('./counter.model')

const ItemSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String, required: true },
    created_by: { type: String, required: true },
}, {
    timestamps: {
        createdAt: 'created_at',
    },
}, { _id: false })

ItemSchema.pre('save', async function() {
    const counterExist = await counter.findOne({ name: 'counter' });
    if (counterExist) {
        const updatedCounter = await counter.findOneAndUpdate({ name: 'counter' }, { $inc: { 'seq': 1 } }, { new: true });
        this.id = updatedCounter.seq;
    } else {
        await counter.create({ name: 'counter' });
        this.id = 1;
    }
});


const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;