const Helpers= require('../helpers/Helpers')


module.exports = {

  addUser: (req, res) => {
    Helpers.addNewUser(req.body)
      .then(() => {
        res.status(200).json({ message: "Inserted new user" });
      })
      .catch(() => {
        res.status(400).json({ message: "User Already exists" });
      });
  },

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

  fetchAllUsers: (req, res) => {
    Helpers.fetchCompleteUsers(req.query.email).then((users) => {
      res.status(200).json(users);
    }).catch(() => {
      res.status(500).json({message:"Database down"})
    });
  },

  sendMessage: (req, res) => {
    Helpers.storeMessage(req.body).then(() => {
      res.status(200).json({message:"Message send successfully"})
    }).catch(() => {
      res.status(500).json({ message: "Database down" });
    })
   },
  
  fetchUserMessages: (req, res) => {
    
    Helpers.fetchAllUserIncomingMessages(req.query.email)
      .then((messages) => {
        
        res.status(200).json(messages);
      })
      .catch(() => {
        res.status(404).json({ message: "No messages found" });
      });
  },
  
  fetchSendMessages: (req, res) => {
    
    Helpers.fetchAllUserOutgoingMessages(req.query.email)
      .then((messages) => {
        
        res.status(200).json(messages);
      })
      .catch(() => {
        res.status(404).json({ message: "No messages found" });
      });
   },
  
  forwardMessage: (req, res) => { 
    
    Helpers.updateMesssage(req.query.messageId, req.body).then(() => {
      res.status(200).json({message:"Message Forwarded"})
    }).catch(() => {
      res.status(500).json({message:"Database down"})
    });
  },
  
};