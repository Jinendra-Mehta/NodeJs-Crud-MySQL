const pool = require("../../config/database");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

function create(data, callBack) {
    pool.query(`INSERT INTO users
    (first_name, last_name, gender, dob, email, password)
    VALUES(?,?,?,?,?,?)
    `,
        [data.first_name,
        data.last_name,
        data.gender,
        new Date(data.dob).toJSON().slice(0, 10),
        data.email,
        data.password],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            } else {
                return callBack(null, results);
            }
        }
    );
}

function getUsers(callBack) {
    pool.query(`SELECT user_id, dob, first_name, last_name, gender, email
    FROM users
    `, [], (err, results, fields) => {
        if (err) return callBack(err);
        else return callBack(null, results);
    });
}

function getUserByEmail(email, callBack) {
    pool.query(`SELECT *
    FROM users where email = ?
    `, [email], (err, results, fields) => {
        if (err) { console.log(err); return callBack(err); }
        else return callBack(null, results[0]);
    });
}

function updateUserByEmail(data, callBack) {
    pool.query(`UPDATE users
    SET first_name=?, last_name=?, gender=?, dob=?, password=?
    WHERE email=?`,
        [data.first_name,
        data.last_name,
        data.gender,
        new Date(data.dob).toJSON().slice(0, 10),
        data.password,
        data.email],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            } else {
                return callBack(null, results);
            }
        }
    );
}

function deleteUserByEmail(email, callBack) {
    pool.query(`DELETE FROM users
    WHERE email = ?   
    `, [email], (err, results, fields) => {
        if (err) return callBack(err);
        else return callBack(null, results);
    });
}

function deleteTableData() {
    pool.query(`truncate table users`, [], (err, results, fields) => {
        if (err) return callBack(err);
        else return callBack(null, results);
    });
}

module.exports = { create, getUsers, getUserByEmail, updateUserByEmail, deleteUserByEmail, deleteTableData };