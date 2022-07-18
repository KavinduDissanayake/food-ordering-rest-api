const express = require('express');
const { databaseConnection } = require('./database');
const mongoose = require("mongoose");




const StartServer = async() => {
    const app = express();

    await databaseConnection();


    app.listen(3022, function() {
        console.log("Server started on port 3000");
    });
}



//main file
StartServer();