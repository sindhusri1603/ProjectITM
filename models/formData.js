const mongoose = require('mongoose');
const formSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    ClassName: { type: String, required: true },
    location: { type: String, required: true },
});

formSchema.index({ Email: 1, ClassName: 1 }, { unique: true }); // Ensure unique Email + ClassName
module.exports=FormData;
