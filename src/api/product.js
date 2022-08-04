const ProductService = require('../services/product-service');
const CustomerService = require('../services/customer-service');
const ResponseHandler = require("../utils/reponse-handler");

module.exports = (app) => {

    const service = new ProductService();
    const customerService = new CustomerService();


    // CREATE PRODUCT
    app.post('/product/create', async(req, res, next) => {

        try {
            const { name, desc, banner, type, unit, price, available, suplier } = req.body;
            const { data } =  await service.CreateProduct({ name, desc, banner, type, unit, price, available, suplier });
            ResponseHandler(res, 200, "Successfully Created product!", data);

        } catch (err) {
            ResponseHandler(res, err.statusCode, err.message, []);
        }

    });


    // GET ALL PRODUCTS
    app.get('/', async (req,res,next) => {
        
        try {
            const { data} = await service.GetProducts();
            ResponseHandler(res, 200, "Getting All Products Successfull!", data);

        } catch (error) {
            ResponseHandler(res, err.statusCode, err.message, []);
        }

    });


    // GET PRODUCT BY ID
    app.get('/:id', async(req,res,next) => {

        const productId = req.params.id;

        try {
            const { data } = await service.GetProductById(productId);
            ResponseHandler(res, 200, `Getting Product With ID ${productId} Successfull!`, data);


        } catch (err) {
            ResponseHandler(res, err.statusCode, err.message, [])
        }

    });


    // GET LIST OF PRODUCTS MATCHING IDS
    app.post('/ids', async(req,res,next) => {

        try {
            const { ids } = req.body;
            const products = await service.GetSelectedProducts(ids);
            ResponseHandler(res, 200, `Getting All Products With IDs ${ids} Successfull!`, data);

        } catch (err) {
            ResponseHandler(res, err.statusCode, err.message, []);
        }

    });


    // GET PRODUCTS BY CATEGORY
    app.get('/category/:type', async(req,res,next) => {

        const type = req.params.type;

        try {
            const { data } = await service.GetProductsByCategory(type);
            ResponseHandler(res, 200, `Getting All Products for Category ${type} Successfull!`, data);

        } catch (err) {
            ResponseHandler(res, err.statusCode, err.message, []);
        }

    });

}