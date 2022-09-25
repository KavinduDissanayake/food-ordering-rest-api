const ProductService = require('../services/product-service');

module.exports = (app) => {
    const service = new ProductService();
    app.use('/app-events', async (req,res,next) => {

        const { payload } = req.body;

        
        //  const resulsts = await service.SubscribeEvents(payload);

        const { event, data } =  payload;

        switch(event){
            case 'GET_PRODUCT_LIST':
                const products = await service.GetSelectedProducts(data);
                return  res.status(200).json(products);
            default:
                break;
        }
 


        console.log("===============  Products Service Received Event ====== ");
        return res.status(200).json(payload);

    });

}