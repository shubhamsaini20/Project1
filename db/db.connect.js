require('dotenv').config()
const mongoose = require("mongoose");
// TODO: move to .env/sec
// TODO: use async await instead of then/catch
const db = process.env.dbName;

const key = process.env.key;
const project = process.env.project;
console.log(key, project, db);
function initializeDBConnection() {
  mongoose
    .connect(
      `mongodb+srv://${db}:${key}@cluster0.0vdny.mongodb.net/${project}?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    )

    .then(() => console.log("successfully connected"))
    .catch((error) => console.error("mongoose connection failed...", error));
}

module.exports = { initializeDBConnection };
