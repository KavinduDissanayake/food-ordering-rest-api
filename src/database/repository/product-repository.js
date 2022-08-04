const { ProductModel } = require("../models");
const { APIError, BadRequestError } = require('../../utils/app-errors')

//Dealing with data base operations
class ProductRepository {

    // CREATE PRODUCT
    async CreateProduct({ name, desc, banner, type, unit, price, available, suplier }){

        try {
            const product = new ProductModel({
                name,
                desc,
                banner,
                type,
                unit,
                price,
                available,
                suplier
            })

            const productResult = await product.save();
            return productResult;

        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Product');
        }

    }


    // GET ALL PRODUCTS
    async Products(){
        try{
            return await ProductModel.find();

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Products');
        }
    }


    // GET PRODUCT BY ID
    async FindById(id){
        try{
            return await ProductModel.findById(id);
            
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product');
        }

    }

    
    // GET LIST OF PRODUCTS MATCHING IDS
    async FindSelectedProducts(selectedIds){
        try{
            const products = await ProductModel.find().where('_id').in(selectedIds.map(_id => _id)).exec();
            return products;

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product');
        }

    }

    
    // GET PRODUCTS BY CATEGORY
    async FindByCategory(category){

        try{
            const products = await ProductModel.find({ type: category});
            return products;

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Category');
        }

    }

}

module.exports = ProductRepository;