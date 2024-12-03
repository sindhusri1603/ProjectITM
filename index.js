const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const FormData = require('./models/formData');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb+srv://Sindhu:Sindhu1234@cluster0.0pgzm.mongodb.net/attendanceDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// API endpoint to handle form submission
app.post('/api/submit', async (req, res) => {
    try {
        const formData = new FormData(req.body);
        await formData.save();
        res.status(201).json({ message: "Attendance marked successfully!" });
    } catch (error) {
        if (error.code === 11000) {
            // Handle unique index errors
            res.status(400).json({ message: "You have already marked attendance for this class." });
        } else if (error.name === 'ValidationError') {
            // Handle validation errors
            res.status(400).json({ message: error.message });
        } else {
            // Handle other errors
            console.error('Unexpected error:', error);
            res.status(500).json({ message: "An error occurred. Please try again." });
        }
    }
});

// Serve the QR page
app.get('/qr', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'qr.html'));
});

// Serve the form page
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
