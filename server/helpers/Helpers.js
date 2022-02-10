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

  fetchCompleteUsers: (userMail) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(COLLECTION.USER_COLLECTION)
        .find({ email: { $ne: userMail } })
        .toArray()
        .then((users) => {
          resolve(users);
        });
    });
  },

  storeMessage: (messageData) => {
    return new Promise((resolve, reject) => {
      messageData.forwards = [];
      messageData.sendDate = new Date().toLocaleString("en-US").slice(0, 9);
      messageData.sendTime = new Date().toLocaleString("en-US").slice(11, 22);
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

  // fetchAllUserMessages: (userEmail) => {
  //   return new Promise((resolve, reject) => {

  //     db.get()
  //       .collection(COLLECTION.MESSAGE_COLLECTION)
  //       .find({
  //         $or: [
  //           { recipient: userEmail },
  //           { forwards: { $elemMatch: { forwardedTo:userEmail} } },
  //         ],
  //       })
  //       .toArray()
  //       .then((messages) => {

  //         if (messages.length != 0) {
  //           resolve(messages.reverse());
  //         } else {
  //           reject();
  //         }
  //       });
  //   });
  // },

  fetchAllUserMessages: (userEmail) => {
    return new Promise(async (resolve, reject) => {
     
      // let directMessage = await db.get().collection(COLLECTION.MESSAGE_COLLECTION).find({ recipient: userEmail });
     
      let directMessage = await db
        .get()
        .collection(COLLECTION.MESSAGE_COLLECTION)
        .aggregate([
          {
            $match: { recipient: userEmail },
          },
          {
            $project: {
              _id: 1,
              recipient: 1,
              subject: 1,
              message: 1,
              sender: 1,
              sendDate: 1,
              sendTime: 1
            },
          }
        ])
        .toArray();


      let forwardedMessage = await db
        .get()
        .collection(COLLECTION.MESSAGE_COLLECTION)
        .aggregate([
          {
            $match: { forwards: { $elemMatch: { forwardedTo: userEmail } } },
          },
          {
            $project: {
              _id: 1,
              recipient: 1,
              subject: 1,
              message: 1,
              sender: 1,
              sendDate: 1,
              sendTime: 1,
              forwards: {
                $filter: {
                  input: "$forwards",
                  as: "forward",
                  cond: { $eq: ["$$forward.forwardedTo", userEmail] },
                },
              },
            },
          },
          {
            $unwind: '$forwards'
          }
        ])
        .toArray();

      console.log("forwardedMessage", forwardedMessage);
      console.log("directMessage", directMessage);
      let messages = forwardedMessage.concat(directMessage);
      console.log("messages", messages);

      if (messages.length != 0) {

        resolve(messages);

      } else {

        reject();

      }
      
    });
  },

  updateMesssage: (messageId, forwardData) => {
    return new Promise((resolve, reject) => {
      forwardData.forwardedDate = new Date()
        .toLocaleString("en-US")
        .slice(0, 9);

      forwardData.forwardedTime = new Date()
        .toLocaleString("en-US")
        .slice(11, 22);

      db.get()
        .collection(COLLECTION.MESSAGE_COLLECTION)
        .updateOne(
          { _id: ObjectId(messageId) },
          {
            $push: {
              forwards: forwardData,
            },
          }
        )
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  },
};
