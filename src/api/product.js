const ProductService = require('../services/product-service');
const CustomerService = require('../services/customer-service');
const ResponseHandler = require("../utils/reponse-handler");
const UserAuth = require('./middlewares/auth')

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


    app.get('/', async (req,res,next) => {
        //check validation
        try {
            const { data} = await service.GetProducts();
            ResponseHandler(res, 200, "Successfully create product!", data)
        } catch (error) {
            ResponseHandler(res, err.statusCode, err.message, [])
        }

    });


    app.get('/:id', async(req,res,next) => {

        const productId = req.params.id;

        try {
            const { data } = await service.GetProductById(productId);
            ResponseHandler(res, 200, "Successfully create product!", data)

        } catch (err) {
            ResponseHandler(res, err.statusCode, err.message, [])
        }

    });


    app.get('/category/:type', async(req,res,next) => {

        const type = req.params.type;

        try {
            const { data } = await service.GetProductsByCategory(type)
            ResponseHandler(res, 200, "Successfully create product!", data)
        } catch (err) {
            ResponseHandler(res, err.statusCode, err.message, [])
        }

    });


    app.post('/ids', async(req,res,next) => {

        try {
            const { ids } = req.body;
            const products = await service.GetSelectedProducts(ids);
            return res.status(200).json(products);
        } catch (err) {
            ResponseHandler(res, err.statusCode, err.message, [])
        }

    });

        
    app.put('/wishlist',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        
        try {
            const product = await service.GetProductById(req.body._id);
            const wishList = await customerService.AddToWishlist(_id, product)
            return res.status(200).json(wishList);
        } catch (err) {
            
        }
    });


    app.delete('/wishlist/:id',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const productId = req.params.id;

        try {
            const product = await service.GetProductById(productId);
            const wishlist = await customerService.RemoveFromWishlist(_id, product)
            return res.status(200).json(wishlist);
        } catch (err) {
            next(err)
        }
    });

}