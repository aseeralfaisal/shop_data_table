const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    created_by: { type: String }
}, {
    timestamps: {
        createdAt: 'created_at',
    },
});

const User = mongoose.model('User', UsersSchema);

module.exports = User;