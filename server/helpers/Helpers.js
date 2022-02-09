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
    return new Promise( (resolve, reject) => {
      db.get().collection(COLLECTION.USER_COLLECTION).find().toArray().then((users) => {
         resolve(users);
      })
     
    })
  }
};
