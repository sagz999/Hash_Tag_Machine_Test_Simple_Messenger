const express = require("express");
const { userLogin, fetchUserMessages, sendMessage, forwardMessage, addUser, fetchAllUsers } = require("../controller/userController");
const router = express.Router();

router.post('/login', userLogin);
router.post('/addUser', addUser);
router.get("/fetchAllUsers/", fetchAllUsers);
router.get('/fetchMessages/', fetchUserMessages);
router.post('/sendMessage', sendMessage);
router.patch('/forwardMessage/', forwardMessage);

module.exports = router; 