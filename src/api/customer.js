const CustomerService = require('../services/customer-service');
const ResponseHandler = require("../utils/reponse-handler");
const  UserAuth = require('./middlewares/auth');

module.exports = (app) => {
    
    const service = new CustomerService();


//-----------------------------------------------signup---------------------------------------------------------------------
    app.post('/customer/signup', async (req,res,next) => {

        try {
            // const { email, password, firstName,lastName } = { email:req.body.email,password: req.body.password,firstName: req.body.firstName,lastName: req.body.lastName};
            const { email, password, firstName,lastName } = req.body;


            const { data } =  await service.SignUp({ email, password, firstName,lastName});
            ResponseHandler(res,200,"Successfully User Created !",data);

        } catch (err) {
            ResponseHandler(res,err.statusCode,err.message,[])
        }

    });


//-----------------------------------------------login---------------------------------------------------------------------

    app.post('/customer/login',  async (req,res,next) => {

        try {

            const { email, password } = req.body;

            const { data } = await service.SignIn({ email, password});

            ResponseHandler(res,200,"Successfully User Login !",data);
        } catch (err) {
            ResponseHandler(res,err.statusCode,err.message,[])
        }

    });

    //-----------------------------------------------Get Profile ---------------------------------------------------------------------

    app.get('/customer/profile', UserAuth ,async (req,res,next) => {

        try {
            const { _id } = req.user;
            const { data } = await service.GetProfile({ _id });

            ResponseHandler(res,200,"Successfully User Profile get !",data);
        } catch (err) {
            ResponseHandler(res,500,err.name,[])
        }
    });


    //----------------------------------------------Add Account---------------------------------------------------------------------
    app.post('/customer/address', UserAuth, async (req,res,next) => {

        try {

            const { _id } = req.user;

            const { street, postalCode, city,country } = req.body;

            const { data } = await service.AddNewAddress( _id ,{ street, postalCode, city,country});

            ResponseHandler(res,200,"Successfully User Profile get !",data);

        } catch (err) {
            ResponseHandler(res,500,err.name,[])
        }


    });

}