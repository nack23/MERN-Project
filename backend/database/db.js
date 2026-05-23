const mongoose = require("mongoose");

require("dotenv").config();

let dbconnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URL);

        console.log("MongoDB Connected Successfully");

    } catch (error) {

        console.log("MongoDB Connection Failed");

        console.log(error.message);

        process.exit(1);
    }
};

module.exports = dbconnection;