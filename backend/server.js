// require('dotenv').config();
// const {fileURLToPath}
//                = require("url");
// import { fileURLToPath } from "url";
require('dotenv').config();
// const fileURLToPath = require('url');
const cors     = require('cors');
const express  = require('express') ;
const mongoose = require('mongoose');
const app      = express();
const path     = require('path');

const uRts     = require('./routes/userRoutes');
const wRts     = require('./routes/wallRoutes');

// Needed for __dirname in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use('/api/users',uRts);
app.use('/api/walls',wRts);


//When deploying : 
if (process.env.NODE_ENV === "production") {
    const clientPath = path.join(__dirname,'../frontend/dist');
    app.use(express.static(clientPath));
    app.get('/',(req,res)=>{
        res.sendFile(path.join(clientPath,'index.html'));
    })
}

mongoose.connect(process.env.MONGOURL).then(()=>{
    app.listen(process.env.PORT,()=>{console.log("Connected to database and listening to request at ",process.env.PORT)})
}).catch(error=>{console.log(error)});