require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const app      = express();

const uRts     = require('./routes/users');
const wRts     = require('./routes/walls')

app.use(express.json());
app.use(cors());

app.use('/api/users',uRts);
app.use('/api/walls',wRts);

mongoose.connect(process.env.MONGOURL).then(()=>{
    app.listen(process.env.PORT,()=>{console.log("Connected to database and listening to requests")})
}).catch(err=>{console.log(err)})