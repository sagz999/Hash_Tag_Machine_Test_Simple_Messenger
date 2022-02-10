const express = require("express");
const { userLogin, fetchUserMessages, sendMessage, forwardMessage, addUser, fetchAllUsers, fetchSendMessages } = require("../controller/userController");
const router = express.Router();

router.post('/login', userLogin); //user login route
router.post('/addUser', addUser); // add user route
router.get("/fetchAllUsers/", fetchAllUsers); // fetch all users route
router.get('/fetchMessages/', fetchUserMessages); //fetch All messages based on user
router.get("/fetchSendMessages/", fetchSendMessages); //fetch all send messages baased on user
router.post('/sendMessage', sendMessage); //send message route
router.patch('/forwardMessage/', forwardMessage); //forward message route

module.exports = router; 