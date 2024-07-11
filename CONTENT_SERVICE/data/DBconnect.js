const mongoose = require("mongoose");

const content = require("./content.js");
const topic = require("./topic.js");
const bookMark = require('./bookmarked.js');

const seedData = require("./seed.js");
const constants = require("../consts.js");

const SCHMA_NAMES = constants.SCHMA_NAMES;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 500,
  socketTimeoutMS: 300,
  maxPoolSize: 10,
};

// All Schemas used by each tenant
const SCHEMAS = new Map([
  [SCHMA_NAMES.content, content],
  [SCHMA_NAMES.topic, topic],
  [SCHMA_NAMES.bookMark,bookMark]
]);

// Change this string to localhost for local dev.
// Change this string to contentdb for containerized dev
const MONGODB_URL ="mongodb://burnet:1234@"+process.env.MONGO_URL+":27017/?authMechanism=DEFAULT&authSource=admin";
  
// "mongodb://burnet:1234@localhost:27018/?authMechanism=DEFAULT&authSource=admin";

const connect = () => mongoose.createConnection(MONGODB_URL, mongoOptions);

let db = null;

const connectToMongoDB = async () => {
  let connection = connect();
  db = connection.useDb("content", { useCache: true });
  if (!Object.keys(db.models).length) {
    SCHEMAS.forEach((schema, modelName) => {
      db.model(modelName, schema);
    });
  }
  connection.on("open", async () => {
    console.log(`Mongoose connection open to ${JSON.stringify(MONGODB_URL)}`);
    await seedData(db);
  });
  connection.on("error", (err) => {
    console.log(
      `Mongoose connection error: ${err} with connection info ${JSON.stringify(
        MONGODB_URL
      )}`
    );
    process.exit(0);
  });
  return db;
};

connectToMongoDB();

function getDB() {
  return db;
}

module.exports = {
  getDB,
  SCHMA_NAMES: SCHMA_NAMES,
};
