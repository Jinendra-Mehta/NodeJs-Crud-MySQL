const { createPool } = require('mysql');

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
});

// const pool = createPool({
//     host: "127.0.0.1",
//     user: "root",
//     password: "root",
//     database: "mysql_dev",
//     connectionLimit: 10
// });

pool.getConnection((err) => {
    if (!err) return `DB Connection Init...`;
    else return `DB Connection Failure...`;
});

module.exports = pool;