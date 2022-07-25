const { ProductModel } = require("../models");
const { APIError, BadRequestError } = require('../../utils/app-errors')

//Dealing with data base operations
class ProductRepository {


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
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Product')
        }

    }

}

module.exports = ProductRepository;