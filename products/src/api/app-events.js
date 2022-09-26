const ProductService = require('../services/product-service');

module.exports = (app) => {

    const service = new ProductService();

    app.use('/app-events', async (req, res, next) => {

        console.log("===============  Products Service Received Event ====== ");

        try {
            const { payload } = req.body;
            const { event, data } = payload;

            switch (event) {
                case 'GET_PRODUCT_LIST':
                    const products = await service.GetSelectedProducts(data);
                  //  console.log(products);
                    return res.status(200).json(products);
                default:
                    break;
            }

        } catch (e) {
            return res.status(500).json(e.name);

        }

        //  const resulsts = await service.SubscribeEvents(payload);

          console.log("===============  Products Service Received Event ====== ");


    });

}