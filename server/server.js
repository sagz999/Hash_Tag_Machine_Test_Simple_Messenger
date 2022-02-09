const express = require("express");
const app = express();
const env = require("dotenv");
const db = require("./config/dbConfig");
const cors = require("cors");
var logger = require("morgan");
const PORT = process.env.PORT || 8000;
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddlewares");

env.config();

//Connecting to database  
db.connect((err) => {
    if (err)
        console.log("Connection error" + err)
    else
        console.log("Database connected to PORT:27017")
});

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`server started on port: ${PORT}`));