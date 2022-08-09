
const mongoose = require("mongoose");

const { dbHost, dbName, dbPort, dbUser, dbPass } = require("../app/config");


mongoose.connect(
  `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`
);
// or use mongo atlas connection
// mongoose.connect(`mongodb+srv://<username>:<password>@<cluster>/<database_name>?retryWrites=true&w=majorit`);
// example:
// mongoose.connect(`mongodb+srv://maman:DJPfNL5Ih5b0xU@cluster0.93ymz.mongodb.net/foodstore?retryWrites=true&w=majorit`);

const db = mongoose.connection;

module.exports = db;
