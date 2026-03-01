// Import the express module
import express from 'express';

//array that will store submitted form data
const contacts = [];

// Create an instance of an Express application
const app = express();

//set EJS as the view engine 
app.set('view engine', 'ejs');

app.use(express.static('public'));

//middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Define the port number where our server will listen
const PORT = 3005;

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
 app.get('/', (req, res) => {
    res.render('index');
});

// Define contact form route ('/')
 app.get('/contact', (req, res) => {
     res.render('contact');
 });


app.get('/admin', (req, res) => {
    res.render('admin', { contacts });
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
        how: req.body.meet,
        other: req.body.otherSpecify,
        message: req.body.message,
        submittedAt: new Date() 
    };

    //  store the submission
    console.log("New submission:", submission);
    contacts.push(submission);
    res.render('confirmation', { submission });
});

 


// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);

});