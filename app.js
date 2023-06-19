const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


//MIDDLEWARE
app.use(express.json());
app.use(cors());


//CONNECT TO DB
mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB!')
);

//LISTEN ON PORT 3000
app.listen(3000);