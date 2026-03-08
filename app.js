// Import modules
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
 

// Create a pool of database connections
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
}).promise();

// Create Express app
const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Server port
const PORT = 3005;

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Handle contact form submission
app.post('/submit', async (req, res) => {
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

  console.log("New submission:", submission);

  try {
    const [result] = await pool.query(
      `INSERT INTO contacts 
      (fname, lname, email, jobTitle, company, linkedin, meet, other, message)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        submission.fname,
        submission.lname,
        submission.email,
        submission.jobTitle,
        submission.company,
        submission.linkedin,
        submission.how,
        submission.other,
        submission.message
      ]
    );
    console.log("Inserted ID:", result.insertId);
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).send("Database error");
  }

  res.render('confirmation', { submission });
});

// Admin page to display all submissions
app.get('/admin', async (req,res) => {
  try {
    const contacts = await pool.query('SELECT * FROM contacts');
    res.render('admin', { contacts: contacts[0] });
  } catch (err) {
    console.error('Database error: ', err);
  }
});
   
 


// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

