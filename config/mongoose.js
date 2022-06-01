// require the library
const mongoose = require('mongoose');

// connect to database

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://backend-seekrNSUT:${process.env.URI}@cluster0.eebry.mongodb.net/?retryWrites=true&w=majority`;
const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
db.connect(err => {
  const collection = db.db("test").collection("devices");
  // perform actions on the collection object
  db.close();
});