const express = require('express');
const cors  = require('cors');
const { customer, appEvents } = require('./api');
const HandleErrors = require('./utils/error-handler')
const bodyParser = require('body-parser')
const multer = require('multer');


module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))



    //form data handler
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));

    //to fixed form data catch issue
    app.use(multer().none());




    // app.use((req,res,next) => {
    //     console.log(req);
    //     next();
    // })

    //Listen to envte
    appEvents(app);

    //api
    customer(app);

    // error handling
    app.use(HandleErrors);
    
}