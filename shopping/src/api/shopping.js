const ShoppingService = require("../services/shopping-service");
const { PublishCustomerEvent } = require("../utils");
const UserAuth = require('./middlewares/auth');
const ResponseHandler = require("../utils/reponse-handler");

module.exports = (app) => {
    
    const service = new ShoppingService();

    app.post('/order',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const { txnNumber } = req.body;


        try {
            const { data } = await service.PlaceOrder({_id, txnNumber});


            const payload = await service.GetOrderPayload(_id, data, 'CREATE_ORDER');

            PublishCustomerEvent(payload);

            ResponseHandler(res,200,"Shopping order get success !",data)

            
        } catch (err) {
            ResponseHandler(res,err.statusCode,err.message,[])
        }

    });

    app.get('/orders',UserAuth, async (req,res,next) => {

        const { _id } = req.user;

        try {
            const { data } = await service.GetOrders(_id);

            ResponseHandler(res,200,"Shopping orders get success !",data)

        } catch (err) {
            ResponseHandler(res,err.statusCode,err.message,[])
        }

    });

    app.get('/cart', UserAuth, async(req,res,next) => {

        const { _id } = req.user;

        try {
            
            const { data } = await service.getCart({ _id });
    
            ResponseHandler(res,200,"Shopping cart get success !",data)

        } catch (err) {
            ResponseHandler(res,err.statusCode,err.message,[])
        }
    })
       
     
}