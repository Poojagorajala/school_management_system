const { getPool } = require('../db');

const createstudentTable = async () => {
    try {
        const pool = getPool();

        const query = `
            CREATE TABLE IF NOT EXISTS students (
                id SERIAL PRIMARY KEY,
                name VARCHAR(30) NOT NULL,
                age INTEGER NOT NULL,
                email VARCHAR(255),  
                father_name VARCHAR(255),  
                contact_number VARCHAR(20),  
                address TEXT  
            );
        `;

        await pool.query(query);
        console.log('student table is created successfully');
    } catch (error) {
        console.error("error in creating table", error.message);
    }
};

module.exports = { createstudentTable };


