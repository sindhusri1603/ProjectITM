const mongoose = require('mongoose');

// Define the schema for attendance form data
const formSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: [true, "Name is required."],
            trim: true, // Removes whitespace from both ends
        },
        Email: {
            type: String,
            required: [true, "Email is required."],
            trim: true,
            lowercase: true, // Ensures emails are stored in lowercase
            match: [/.+@.+\..+/, "Please enter a valid email address."], // Regex for basic email validation
        },
        ClassName: {
            type: String,
            required: [true, "Class Name is required."],
            trim: true,
        },
        location: {
            type: String,
            required: [true, "Location is required."],
            trim: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create a unique index for Email and ClassName combination
formSchema.index(
    { Email: 1, ClassName: 1 },
    { unique: true, message: "You have already marked attendance for this class." }
);

// Create the model
const FormData = mongoose.model('FormData', formSchema);

module.exports = FormData;

