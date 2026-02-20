// Import the express module
import express from 'express';

//array that will store submitted form data
let contacts = [];

// Create an instance of an Express application
const app = express();

app.use(express.static('public'));

//middleware to parse form data
app.use(express.urlencoded({ extended: true }));


// Define the port number where our server will listen
const PORT = 3000;


// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    
    res.sendFile(`${import.meta.dirname}/views/index.html`);
});

// Handle form submission
app.post('/submit', (req, res) => {
    console.log("New submission:", req.body);
    contacts.push(req.body);
    res.redirect('/confirmation');
});


// Confirmation page
app.get('/confirmation', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

// admin route
app.get('/admin', (req, res) => {
    res.json(contacts); // send the array as JSON
});




// Start the server and listen on the specified port
app.listen(PORT, () => {

    console.log(`Server is running at http://localhost:${PORT}`);

});