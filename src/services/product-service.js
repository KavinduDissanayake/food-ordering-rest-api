const {ProductRepository} = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class ProductService {

    constructor(){
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs){
        try {
            const productResult = await this.repository.CreateProduct(productInputs)
            return FormateData(productResult);
        } catch(err) {
            throw new APIError('Data Not found')
        }
    }

    async GetProducts() {
        try {
            const products = await this.repository.Products();

            return FormateData({
                products,
            })

        }catch(err){
            throw new APIError('Data Not found')
        }
    }

}

module.exports = ProductService;