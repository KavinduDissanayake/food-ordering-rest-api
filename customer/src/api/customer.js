const CustomerService = require('../services/customer-service');
const UserAuth = require('./middlewares/auth');
const ResponseHandler = require("../utils/reponse-handler");
// const { PublishProductEvent } = require('../utils');
const axios = require('axios');

module.exports = (app) => {

    const service = new CustomerService();

    //-----------------------------------------------login---------------------------------------------------------------------
    app.post('/login', async (req, res, next) => {

        //  console.log("Testing");
        try {
            const { email, password } = req.body;
            const { data } = await service.SignIn({ email, password });
            ResponseHandler(res, 200, "Successfully User Login !", data.existingCustomer);
        } catch (err) {
            ResponseHandler(res, err.statusCode, err.message, [])
        }


    });

    //-----------------------------------------------signup---------------------------------------------------------------------
    app.post('/signup', async (req, res, next) => {

        try {
            const { email, password, firstName, lastName } = req.body;
            const { data } = await service.SignUp({ email, password, firstName, lastName });
            ResponseHandler(res, 200, "Successfully User Created !", data);
        } catch (err) {
            ResponseHandler(res, err.statusCode, err.message, [])
        }



    });

    //-----------------------------------------------Get Profile ---------------------------------------------------------------------
    app.get('/profile', UserAuth, async (req, res, next) => {

        try {
            const { _id } = req.user;
            const { data } = await service.GetProfile({ _id });

            ResponseHandler(res, 200, "Successfully User Profile get !", data);
        } catch (err) {
            ResponseHandler(res, 500, err.name, [])
        }

    });



    //----------------------------------------------Edit Profile---------------------------------------------------------------------
    app.put('/edit_profile', UserAuth, async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { firstName, lastName, address } = req.body;
            const { data } = await service.EditProfile({ _id }, { firstName, lastName, address });
            ResponseHandler(res, 200, "Successfully User Profile get !", data);
        } catch (err) {
            ResponseHandler(res, 500, err.name, [])
        }
    });



    //----------------------------------------------Wishlist---------------------------------------------------------------------
    app.get('/wishlist', UserAuth, async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { data } = await service.GetWishList(_id);
            

            //if no  data then we no need to access product service
            if(data !== null && data !== '') {
                // do something
                return  ResponseHandler(res, 200, "Successfully User wishlist !", []);
             }
             

            const payload = {
                event: "GET_PRODUCT_LIST",
                data: data
            }

            //call product micro service  
                await axios.post('http://localhost:8000/app-events', {
                    payload
                })
                .then(function (response2) {
                    console.log(response2.data);
                    ResponseHandler(res, 200, "Successfully User wishlist !", response2.data.data);
                })

                .catch(function (error) {
                    console.log(error);
                    ResponseHandler(res, 500, error.name, []);
                })


        } catch (err) {
            ResponseHandler(res, 500, err.name, [])
        }


    });


}