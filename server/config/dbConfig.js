let MongoClient = require("mongodb").MongoClient;

const state = {
  db: null,
};

module.exports.connect = function (done) {
  const url = process.env.MONGO_URL;
  const dbname = process.env.MONGO_DB_NAME;

  MongoClient.connect(url, (err, client) => {
    if (err) return done(err);
    state.db = client.db(dbname);
    done();
  });
};

module.exports.get = function () {
  return state.db;
};
