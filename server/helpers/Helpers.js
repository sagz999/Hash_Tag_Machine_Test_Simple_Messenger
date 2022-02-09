const db = require("../config/dbConfig");
const COLLECTION = require("../config/dbCollections");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");

module.exports = {
  addNewUser: (userData) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(COLLECTION.USER_COLLECTION)
        .findOne({ email: userData.email })
        .then(async (user) => {
          console.log(user);
          if (user) {
            reject();
          } else {
            userData.password = await bcrypt.hash(userData.password, 10);
            db.get()
              .collection(COLLECTION.USER_COLLECTION)
              .insertOne(userData)
              .then(() => {
                resolve();
              });
          }
        });
    });
  },
  login: (userData) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(COLLECTION.USER_COLLECTION)
        .findOne({ email: userData.email })
        .then(async (user) => {
          if (user) {
            let checkPass = await bcrypt.compare(
              userData.password,
              user.password
            );
            if (checkPass) {
              const { password, ...rest } = user;
              resolve(rest);
            } else {
              resolve(false);
            }
          } else {
            reject();
          }
        });
    });
  },

  fetchCompleteUsers: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(COLLECTION.USER_COLLECTION)
        .find()
        .toArray()
        .then((users) => {
          resolve(users);
        });
    });
  },

  storeMessage: (messageData) => {
    return new Promise((resolve, reject) => {
      messageData.forwards = [];
      db.get()
        .collection(COLLECTION.MESSAGE_COLLECTION)
        .insertOne(messageData)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  },

  fetchAllUserMessages: (userEmail) => {
    return new Promise((resolve, reject) => {
      console.log(userEmail);
      db.get().collection(COLLECTION.MESSAGE_COLLECTION).find({$or:[{ recipient: userEmail },{forwards:userEmail}]}).toArray().then((messages) => {
        if (messages.length != 0) {
          resolve(messages);
        } else {
          reject();
        };
      })
     
      
    })
  }
};
