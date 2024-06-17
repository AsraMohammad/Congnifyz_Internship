const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000; // this is our port number

const app = express(); // this is our app or instance of express

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML form
app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route to handle form submission
app.post('/formPost', (req, res) => {
    const { username, password, email, age } = req.body; // Destructure req.body to get variables
    res.send(`Thank you for visiting us, ${username}!<br>Form submitted successfully!`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
