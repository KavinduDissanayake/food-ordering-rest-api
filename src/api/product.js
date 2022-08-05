const ProductService = require('../services/product-service');
const CustomerService = require('../services/customer-service');
const ResponseHandler = require("../utils/reponse-handler");
const UserAuth = require('./middlewares/auth')

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


    //ADD PRODUCTS TO WISHLIST   
    app.put('/wishlist',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        
        try {
            const product = await service.GetProductById(req.body._id);
            const wishList = await customerService.AddToWishlist(_id, product)
            return res.status(200).json(wishList);
        } catch (err) {
            
        }
    });

    //DELETE PRODUCTS FROM WISHLIST
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

    
    //ADD PRODUCTS TO CART
    app.put('/cart',UserAuth, async (req,res,next) => {
        
        const { _id, qty } = req.body;
        
        try {     
            const product = await service.GetProductById(_id);
    
            const result =  await customerService.ManageCart(req.user._id, product, qty, false);
    
            return res.status(200).json(result);
            
        } catch (err) {
            next(err)
        }
    });

}