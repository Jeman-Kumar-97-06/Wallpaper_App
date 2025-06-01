const express  = require('express');
const mongoose = require('mongoose');
const app      = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGOURL).then(()=>{
    app.listen(process.env.PORT,()=>{console.log("Connected to database and listening to requests")})
}).catch(err=>{console.log(err)})