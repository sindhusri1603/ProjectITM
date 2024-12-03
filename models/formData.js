const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    ClassName: { type: String, required: true },
    location: { type: String, required: true },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Ensure unique Email + ClassName combination to prevent duplicate registrations
formSchema.index({ Email: 1, ClassName: 1 }, { unique: true });

const FormData = mongoose.model('FormData', formSchema);
module.exports = FormData;

