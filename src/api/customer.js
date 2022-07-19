const CustomerService = require('../services/customer-service');
const ResponseHandler = require("../utils/reponse-handler");
const res = require("express/lib/response");

module.exports = (app) => {
    
    const service = new CustomerService();

    app.post('/customer/signup', async (req,res,next) => {

        try {
            const { email, password, phone } = { email:req.body.email,password: req.body.password,phone: req.body.phone};

            await service.SignUp({ email, password, phone}).catch((err)=>{
                ResponseHandler(res,422 ,"Unable to Create Customer",[])
            }).then((value)=>{
                ResponseHandler(res,200,"Successfully User Created !",value)
            });

            
        } catch (err) {
            ResponseHandler(res,500,err.name,[])
        }

    });

}