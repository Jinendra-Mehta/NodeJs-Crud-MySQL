const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());

app.use("/api/users", userRouter);

const server = app.listen(process.env.APP_PORT, () => {
    console.log(`Server Stared on port ${process.env.APP_PORT}`);
});

module.exports = server