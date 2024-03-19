const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000; // Change this to your desired port

// Create a MySQL connection
const dbConfig = {
    host: 'localhost', // Change this to your database host
    user: 'kare',      // Change this to your database username
    password: 'jesuschrist06',      // Change this to your database password
    database: 'mwiki'  // Change this to your database name
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database!');
});

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submissions
app.post('/submit', (req, res) => {
    const  fname  = req.body;


    // Insert the name into the 'users' table
    const query = 'INSERT INTO users (fname) VALUES (?)';
    connection.query(query, [fname], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error submitting name.');
            return;
        }
        console.log('Name submitted successfully:', fname);
        res.send('Name submitted successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
