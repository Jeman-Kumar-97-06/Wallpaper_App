require('dotenv').config();
const cors     = require('cors');
const express  = require('express') ;
const mongoose = require('mongoose');
const app      = express();
const path     = require('path');

const uRts     = require('./routes/userRoutes');
const wRts     = require('./routes/wallRoutes');

app.use(express.json());
app.use(cors());

app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use('/api/users',uRts);


mongoose.connect(process.env.MONGOURL).then(()=>{
    app.listen(process.env.PORT,()=>{console.log("Connected to database and listening to request at ",process.env.PORT)})
}).catch(error=>{console.log(error)});