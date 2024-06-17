const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Temporary storage for validated data
let dataStore = [];

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Endpoint to handle form submissions
app.post('/submit', (req, res) => {
    const { name, email, password, age } = req.body;

    // Server-side validation
    let errors = [];
    if (!name || !email || !password || !age) {
        errors.push('All fields are required.');
    }
    if (isNaN(age) || age < 18) {
        errors.push('Age must be a number and at least 18.');
    }

    if (errors.length > 0) {
        res.render('error', { errors });
    } else {
        // Store validated data
        dataStore.push({ name, email, age });
        res.render('response', { name, email, age });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
