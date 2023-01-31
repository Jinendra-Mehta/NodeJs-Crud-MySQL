const { createUser, getUserByMail, getAllUsers, updateUserByMail, deleteUser, login } = require("./user.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

router.post("/createUser/", createUser);
router.get("/getAllUsers/", checkToken, getAllUsers);
router.get("/getUserByMail/:email", checkToken, getUserByMail);
router.put("/updateUserByMail/", checkToken, updateUserByMail);
router.delete("/deleteUser/:email", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;