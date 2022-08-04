const ShoppingService = require("../services/shopping-service");
const UserAuth = require('./middlewares/auth');

module.exports = (app) => {
    
    const service = new ShoppingService();

    app.post('/shopping/order',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const { txnNumber } = req.body;


        try {
            const { data } = await service.PlaceOrder({_id, txnNumber});
            return res.status(200).json(data);
            
        } catch (err) {
            next(err)
        }

    });
}