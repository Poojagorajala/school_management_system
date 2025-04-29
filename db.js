const { Pool, Client } = require('pg');

let pool;

const setupDatabase = async () => {
    // Step 1: Connect to 'postgres' to create 'schooldb'
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        password: 'pooja',
        port: 5432,
        database: 'postgres'
    });

    try {
        await client.connect();
        await client.query('CREATE DATABASE schooldb');
        console.log('✅ Database "schooldb" created');
    } catch (err) {
        if (err.code === '42P04') {
            console.log('ℹ️  Database "schooldb" already exists');
        } else {
            console.error('❌ Error creating database:', err.message);
        }
    } finally {
        await client.end();
    }

    // Step 2: Connect to 'schooldb' using Pool
    pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'schooldb',
        password: 'pooja',
        port: 5432
    });

    try {
        await pool.query('SELECT NOW()');
        console.log('✅ Connected to "schooldb"!');
    } catch (err) {
        console.error('❌ Failed to connect to "schooldb":', err.message);
        return;
    }

    // Step 3: Create 'students' table if not exists
    // try {
    //     await pool.query(`
    //         CREATE TABLE IF NOT EXISTS students (
    //             id SERIAL PRIMARY KEY,
    //             name VARCHAR(100) NOT NULL,
    //             age INT NOT NULL
    //         )
    //     `);
    //     console.log('✅ Table "students" is ready');
    // } catch (err) {
    //     console.error('❌ Failed to create "students" table:', err.message);
    // }
};

const getPool = () => {
    if (!pool) {
        throw new Error('❌ Pool is not initialized. Call setupDatabase() first.');
    }
    return pool;
};

module.exports = {
    setupDatabase,
    getPool
};