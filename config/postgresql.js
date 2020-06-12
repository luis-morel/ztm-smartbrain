const knex = require('knex'); // SQL Query Builder
var db = {};

// PostgreSQL Database
if (process.env.DATABASE_URL) {
    db = knex({
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: true
        }
    });
} else {
    db = knex({
        client: 'pg',
        connection: {
            host: 'localhost', // 127.0.0.1
            user: 'ztm_admin',
            password: 'ztmr0ck5!',
            database: 'face_recognition'
        }
    });
};

module.exports = {
    db
};