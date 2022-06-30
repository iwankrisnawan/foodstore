// (1) import package mongoose
const mongoose = require("mongoose");

// (2) kita import konfigurasi terkait MongoDB dari `app/config.js`
const { dbHost, dbName, dbPort, dbUser, dbPass } = require("../app/config");

// (3) connect ke MongoDB menggunakan konfigurasi yang telah kita import
// mongoose
//   .connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`,
//     {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

mongoose.connect(
  `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`
);

// mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin

// mongodb://localhost:123456/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
// mongodb://user_latihan:123456@localhost:27017/foodstore?authSource=admin
// (4) simpan koneksi dalam constant `db`
const db = mongoose.connection;

// (5) export `db` supaya bisa digunakan oleh file lain yang membutuhkan
module.exports = db;
