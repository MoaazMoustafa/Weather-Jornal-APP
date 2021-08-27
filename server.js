// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5000;
app.listen(port, listening());
function listening() {
    console.log('running on server  ' + port)
}


app.get('/all', function (req, res) {
    res.send(projectData);
})


app.post('/add', function (req, res) {
    data = {
        date: req.body.date,
        temp: req.body.temp,
        feeling: req.body.feelings
    }
    console.log(req.body);
    projectData = data;
})