const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// dotenv
dotenv.config();

// database connection
const dbconnection = require("./database/db");

dbconnection();

// middleware
app.use(cors({

    origin: "http://localhost:3000",

    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

// routes
const allroutes = require("./routers/allroutes");

app.use(allroutes);

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});