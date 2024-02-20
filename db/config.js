const { Pool } = require('pg');
require('dotenv').config();

const { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

const pool = new Pool({

    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,    
    allowExitOnIdle: true
});

const getData = async () => {
    const res = await pool.query("SELECT NOW()");
    console.log(res.rows[0]);
    return res.rows;
};

getData();

module.exports = pool;