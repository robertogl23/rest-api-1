const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
require('./config/config');
const app = express();
app.use(cors());
const port = process.env.PORT || 4000;
const morgan = require('morgan');

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/verb',require('./routes/routes'));

mongoose.connect(process.env.URLDB, { useNewUrlParser : true, useCreateIndex: true },(err,res) =>{

if(err) throw err;
    console.log('Database Online');
});

app.use(morgan('dev'));

app.use(express.json());


app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${ port }`);
});