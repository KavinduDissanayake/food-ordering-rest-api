const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser')
const multer = require('multer');

const ResponseHandler = require("./utils/reponse-handler");





const app = express();

app.use(cors());
app.use(express.json());

 //form data handler
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.static('public'));

 //to fixed form data catch issue
 app.use(multer().none());

 app.use('/customer',proxy('http://localhost:8001', {
    proxyErrorHandler: function(err, res, next) {
     ResponseHandler(res, 500, "Customer Service Not Running !", [])
    }
  }))
  

  app.use('/shopping',proxy('http://localhost:8003', {
    proxyErrorHandler: function(err, res, next) {
     ResponseHandler(res, 500, "Shopping Service Not Running !", [])
    }
  }))


  app.use('/',proxy('http://localhost:8002', {
    proxyErrorHandler: function(err, res, next) {
     ResponseHandler(res, 500, "Product Service Not Running !", [])
    }
  }))




app.listen(8000, () => {
    console.log('Gateway is Listening to Port 8000')
})