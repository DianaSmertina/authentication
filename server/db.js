const dotenv = require('dotenv');
dotenv.config();
const password = process.env.DB_PASSWORD;
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'admin',
    password: password,
    host: 'dpg-cj7qpg4l975s73dgvaf0-a.frankfurt-postgres.render.com',
    port: 5432,
    database: 'task4_s7ao',
    ssl: true,
});

module.exports = pool;