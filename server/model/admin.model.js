const mongoose = require('mongoose');

const AdminUsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: {
        createdAt: 'created_at',
    },
});

const Admin = mongoose.model('Admin', AdminUsersSchema);

module.exports = Admin;