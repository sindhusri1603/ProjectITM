const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    class: { type: String, required: true } // Add class field
});

const FormData = mongoose.model('FormData', formSchema);
module.exports=FormData;
