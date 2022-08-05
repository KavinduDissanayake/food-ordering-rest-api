
const express = require('express');
const cors  = require('cors');
const HandleErrors = require('./utils/error-handler')
const ResponseHandler = require('./utils/reponse-handler')

const bodyParser = require('body-parser')
const multer = require('multer');



const { customer } = require('./api');
const { product } = require('./api');
const { shopping } = require('./api')


module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //for user profile upload
    app.use('/profile', express.static('upload/images'));

    //form data handler
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));

    //to fixed form data catch issue
    app.use(multer().none());



    //api
    customer(app);
    product(app);
    shopping(app);


    // error handling
    app.use(HandleErrors);

    //response handling
    app.use(ResponseHandler);

    //Image upload
    //app.use(ImageUploadHandler);


}