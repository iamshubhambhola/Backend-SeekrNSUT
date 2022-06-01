// require the library
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

// aquire the connection(to check if it is successful)
const db = mongoose.connection;

//  do this if error
db.on('error' , console.error.bind(console , 'error connecting to db'));

// up and runnning correctly then do this
db.once('open' , function(){
    console.log("succesfully connected to database");
} )