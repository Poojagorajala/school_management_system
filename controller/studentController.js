const { getPool } = require('../db');

// ---- MODEL FUNCTIONS 
const insertStudent = async (name, age, email, fatherName, contactNumber, address) => {
    const pool = getPool();
    try {
        const query = `
            INSERT INTO students (name, age, email, father_name, contact_number, address)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const result = await pool.query(query, [name, age, email, fatherName, contactNumber, address]);
        return result.rows[0]; // Return the inserted student
    } catch (error) {
        console.error('Error inserting student:', error.message);
        throw error;
    }
};

const getAllStudents = async () => {
    const pool = getPool();
    try {
        // console.log('Attempting to fetch students...'); // Added logging
        const query = `SELECT id, name, age, email FROM students`; // Select only basic info for the list
        // console.log('Executing query:', query); // Added logging
        const result = await pool.query(query);
        console.log('Query result:', result.rows); // Added logging

        if (!result || !result.rows) {
            // Handle the case where result or result.rows is undefined/null
            const error = new Error("No result or rows returned from database query");
            console.error('Error in getAllStudents:', error);
            throw error; // Explicitly throw an error
        }
        return result.rows;
    } catch (error) {
        console.error('Error fetching students:', error); // Log the entire error object
        throw error;
    }
};

const getStudentById = async (id) => {
    const pool = getPool();
    try {
        const query = `SELECT * FROM students WHERE id = $1`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching student by id:', error.message);
        throw error;
    }
};

const deleteStudentById = async (id) => {
    const pool = getPool();
    try {
        const query=`DELETE FROM students WHERE id = $1`;
         const result=await pool.query(query, [id]);
         return result.rows[0];
    } catch (error) {
        console.error('Error deleting student:', error.message);
        throw error;
    }
};

// ---- CONTROLLER FUNCTIONS ---

// Show all students (GET /students)
exports.getAllStudentsPage = async (req, res) => {
    try {
        const students = await getAllStudents();
        res.render('students', { students });
    } catch (error) {
        console.error('Error fetching students in getAllStudentsPage:', error); // Log the entire error
        res.status(500).send('Failed to fetch students');
    }
};
// Show the form to add a student (GET /students/add)
exports.addStudentPage = (req, res) => {
    res.render('addStudent'); // Render the form to add a student
};

// Handle adding a new student (POST /students/add)
exports.addStudent = async (req, res) => {
    const { name, age, email, fatherName, contactNumber, address } = req.body;
    try {
        const newStudent = await insertStudent(name, age, email, fatherName, contactNumber, address); // Insert the student into the database with new fields
        res.redirect('/students'); // Redirect to the list of students
    } catch (error) {
        console.error('Error adding student:', error.message);
        res.status(500).send('Failed to add student');
    }
};

// Show details of a single student (GET /students/:id)
exports.getSingleStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await getStudentById(id);
        if (student) {
            res.render('studentDetails', { student });
        } else {
            res.status(404).send('Student not found');
        }
    } catch (error) {
        console.error('Error fetching student by id:', error.message);
        res.status(500).send('Failed to fetch student');
    }
};

// Handle deleting a student (POST /students/:id/delete)
exports.deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteStudentById(id);
        res.redirect('/students'); // Redirect to the list of students after deletion
    } catch (error) {
        console.error('Error deleting student:', error.message);
        res.status(500).send('Failed to delete student');
    }
};

