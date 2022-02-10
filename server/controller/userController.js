const Helpers= require('../helpers/Helpers')


module.exports = {

  //controller to add a new user
  addUser: (req, res) => {
    Helpers.addNewUser(req.body)
      .then(() => {
        res.status(200).json({ message: "Inserted new user" });
      })
      .catch(() => {
        res.status(400).json({ message: "User Already exists" });
      });
  },

  //controller for user authentication
  userLogin: (req, res) => {
    Helpers.login(req.body)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(400).json({ message: "Invalid password" });
        }
      })
      .catch(() => {
        res.status(404).json({ message: "User not found" });
      });
  },


  //controller to fetch all users excluding the active user
  fetchAllUsers: (req, res) => {
    Helpers.fetchCompleteUsers(req.query.email).then((users) => {
      res.status(200).json(users);
    }).catch(() => {
      res.status(500).json({message:"Database down"})
    });
  },


  //controller to send message
  sendMessage: (req, res) => {
    Helpers.storeMessage(req.body).then(() => {
      res.status(200).json({message:"Message send successfully"})
    }).catch(() => {
      res.status(500).json({ message: "Database down" });
    })
   },
  

  //controller to fetch all messages of user
  fetchUserMessages: (req, res) => {
    
    Helpers.fetchAllUserIncomingMessages(req.query.email)
      .then((messages) => {
        
        res.status(200).json(messages);
      })
      .catch(() => {
        res.status(404).json({ message: "No messages found" });
      });
  },
  
  //controller to fetch all send messages of user
  fetchSendMessages: (req, res) => {
    
    Helpers.fetchAllUserOutgoingMessages(req.query.email)
      .then((messages) => {
        
        res.status(200).json(messages);
      })
      .catch(() => {
        res.status(404).json({ message: "No messages found" });
      });
   },
  
  //controller to forward message
  forwardMessage: (req, res) => { 
    
    Helpers.updateMesssage(req.query.messageId, req.body).then(() => {
      res.status(200).json({message:"Message Forwarded"})
    }).catch(() => {
      res.status(500).json({message:"Database down"})
    });
  },
  
};