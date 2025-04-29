const express = require('express');
const path = require('path');
const { setupDatabase } = require('./db');
const session = require('express-session');
const app = express();
const studentRoute = require('./route/studentroute'); 
// Import the student routes
const { createstudentTable } = require('./model/studentSchema');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));


// Use the student routes
app.use('/', studentRoute);

// Startup routine: DB setup and table creation
(async () => {
  try {
    await setupDatabase();      // Connect to DB
    await createstudentTable();    // Create users table if not exists
    // await createTaskTable();    // Create tasks table if not exists

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
  }
})();