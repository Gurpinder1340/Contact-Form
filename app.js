// Import the express module
import express from 'express';

//array that will store submitted form data
const contacts = [];

// Create an instance of an Express application
const app = express();

app.use(express.static('public'));

//middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Define the port number where our server will listen
const PORT = 3005; 

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/index.html`);
});

// Handle form submission
app.post('/submit', (req, res) => {
    
    // Create a submission object from form data
    const submission = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        linkedin: req.body.linkedin,
        how: req.body.how,
        other: req.body.other,
        message: req.body.message,
    };

    //  store the submission
    console.log("New submission:", submission);
    contacts.push(submission);

    // Redirect to the confirmation page
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