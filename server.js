const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const db = require('./config/keys').mongoURI;
const app = express();
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
//const bodyParser= require('body-parser');
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json({ extended: false }));


app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use('/api/project', require('./routes/project'));



const connectDB = async () => {
    try { await mongoose.connect('mongodb://localhost/seekr', { useNewUrlParser: true, useUnifiedTopology: true }); console.log('mongodb connected...'); } catch (err) {
        console.log(err.message); //exit process 1 
        process.exit(1);
    }
}
connectDB();


app.get('/', (req, res) => {
    res.send("hello")
})

app.listen(port, function (err) {
    if (err) {
        console.log('error!');
    }
    console.log(`yups! expreess server is running on port http://localhost:${port} : `, port);
})