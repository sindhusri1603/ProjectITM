const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
//require('dotenv').config(); // To manage environment variables

const app = express();
const port = 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const mongoURI = "mongodb+srv://Sindhu:Sindhu1234@cluster0.0pgzm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('MongoDB connection error:', err));

// Define a schema (this is an example)
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    className: String,
    location: String,
});
// Create a model based on the schema
const Form = mongoose.model('Form', formSchema);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// API endpoint to handle form submission
app.post('/api/submit', async (req, res) => {
    const { Name, Email, ClassName, location } = req.body;

    try {
        const existingEntry = await Form.findOne({ Email, ClassName });
        if (existingEntry) {
            return res.status(400).json({ message: 'Attendance already marked!' });
        }

        if (location.trim() === "St. Albert" || location.trim() === "Edmonton") {
            const newForm = new Form({ Name, Email, ClassName, location });
            await newForm.save();
            res.json({ message: 'Data successfully submitted!' });
        } else {
            res.status(400).json({ message: 'Location not allowed!' });
        }
    } catch (error) {
        console.error('Error saving to MongoDB:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

