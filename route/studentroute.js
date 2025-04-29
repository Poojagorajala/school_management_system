const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

// Show all students
router.get('/students', studentController.getAllStudentsPage);

// Show add student form
router.get('/students/add', studentController.addStudentPage);

// Handle add student form submission
router.post('/students/add', studentController.addStudent);

// Show single student details
router.get('/students/:id', studentController.getSingleStudent);

// Handle delete student
router.post('/students/:id/delete', studentController.deleteStudent);

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const studentController = require('../controller/studentController');

// // Show all students
// router.get('/', studentController.getAllStudentsPage);  // This will be '/students'

// // Show add student form
// router.get('/add', studentController.addStudentPage);  // This will be '/students/add'

// // Handle add student form submission
// router.post('/add', studentController.addStudent);  // This will be '/students/add'

// // Show single student details
// router.get('/:id', studentController.getSingleStudent);  // This will be '/students/:id'

// // Handle delete student
// router.post('/:id/delete', studentController.deleteStudent);  // This will be '/students/:id/delete'

// module.exports = router;

