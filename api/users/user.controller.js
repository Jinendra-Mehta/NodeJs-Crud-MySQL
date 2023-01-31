const { create, getUsers, getUserByEmail, updateUserByEmail, deleteUserByEmail, deleteTableData } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


function sendRes(err, results, res) {
    let message;
    try {
        message = err.code + ` ` + err.errno;
    } catch (ex) {
        message = `somthing went wrong`;
    }
    if (err) {
        return res.status(500).json({
            success: 0,
            message: message
        });
    }
    else {
        return res.status(200).json({
            success: 1,
            data: results
        });
    }
}

// function loginRes(body, err, results, res) {
//     if (err) {
//         return res.status(500).json({
//             success: 0,
//             message: err
//         });
//     } else if (!results) {
//         return res.status(403).json({
//             success: 0,
//             message: "Invalid User or Password"
//         });
//     } else {
//         const result = compareSync(body.password, results.password);
//         if (result) {
//             results.password = undefined;
//             const jsontoken = sign({ result: results }, process.env.SECRET_KEY, {
//                 expiresIn: "1h"
//             });
//             return res.json({
//                 success: 1,
//                 message: "Logged In",
//                 token: jsontoken
//             });
//         } else {
//             return res.json({
//                 success: 0,
//                 message: "Authentication Failure"
//             });
//         }
//     }
// }

function login(req, res) {
    const body = req.body;
    if (body.email === '' || body.password === '') {
        return res.status(401).json({
            success: 0,
            message: `Please proovide credentials`
        });
    }
    getUserByEmail(body.email, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: err
            });
        } else if (!results) {
            return res.status(401).json({
                success: 0,
                message: "Invalid User or Password"
            });
        } else {
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.SECRET_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Logged In",
                    token: jsontoken
                });
            } else {
                return res.status(401).json({
                    success: 0,
                    message: "Authentication Failure"
                });
            }
        }
    });
}

function getEncryptPass(password) {
    const salt = genSaltSync(10);
    encPass = hashSync(password, salt);
    return encPass;
}

function createUser(req, res) {
    const body = req.body;
    body.password = getEncryptPass(body.password);
    create(body, (err, results) => sendRes(err, results, res));
}

function getAllUsers(req, res) {
    getUsers((err, results) => sendRes(err, results, res));
}

function getUserByMail(req, res) {
    const params = req.params;
    getUserByEmail(params.email, (err, results) => sendRes(err, results, res));
}

function updateUserByMail(req, res) {
    const body = req.body;
    body.password = getEncryptPass(body.password);
    updateUserByEmail(body, (err, results) => sendRes(err, results, res));
}

function deleteUser(req, res) {
    const params = req.params;
    deleteUserByEmail(params.email, (err, results) => sendRes(err, results, res));
}

module.exports = { createUser, getUserByMail, getAllUsers, updateUserByMail, deleteUser, login };