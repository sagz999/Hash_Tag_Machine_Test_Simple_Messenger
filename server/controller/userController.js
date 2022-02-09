const Helpers= require('../helpers/Helpers')


module.exports = {
  addUser: (req, res) => {
    Helpers.addNewUser(req.body).then(() => {
      res.status(200).json({ message: "Inserted new user" });
    }).catch(() => {
      res.status(400).json({ message: "User Already exists" });
    });
  },
  
  userLogin: (req, res) => {
    Helpers.login(req.body).then((user) => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(400).json({message:"Invalid password"})
      }
    }).catch(() => {
      res.status(404).json({message:"User not found"})
    });
  },
  fetchAllUsers: (req, res) => {
    Helpers.fetchCompleteUsers().then((users) => {
      res.status(200).json(users)
    })
  },
  fetchUserMessages: (req, res) => {},
  sendMessage: (req, res) => {},
  forwardMessage: (req, res) => {}
};