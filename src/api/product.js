const ProductService = require('../services/product-service');
const CustomerService = require('../services/customer-service');
const ResponseHandler = require("../utils/reponse-handler");

module.exports = (app) => {

    const service = new ProductService();
    const customerService = new CustomerService();


    app.post('/product/create', async(req, res, next) => {

        try {
            const { name, desc, banner, type, unit, price, available, suplier } = req.body;
            // validation
            const { data } =  await service.CreateProduct({ name, desc, banner, type, unit, price, available, suplier });
            ResponseHandler(res, 200, "Successfully create product!", data)

        } catch (err) {
            ResponseHandler(res, err.statusCode, err.message, [])
        }

    });

}