const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


//MIDDLEWARE
app.use(express.json());
app.use(cors());

//IMPORT ROUTES
const tasksRouter = require('./routes/tasks');

//CONNECT TO DB
mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB!')
);

//USE ROUTES
app.use('/tasks', tasksRouter);

//LISTEN ON PORT 3000
app.listen(3000);