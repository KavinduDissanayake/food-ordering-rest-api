const {ProductRepository} = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class ProductService {

    constructor(){
        this.repository = new ProductRepository();
    }

    
    // CREATE PRODUCT
    async CreateProduct(productInputs){
        try {
            const productResult = await this.repository.CreateProduct(productInputs);
            return FormateData(productResult);

        } catch(err) {
            throw new APIError('Data Not found');
        }
    }


    // GET ALL PRODUCTS
    async GetProducts() {
        try {
            const products = await this.repository.Products();

            return FormateData({
                products,
            })

        }catch(err){
            throw new APIError('Data Not found');
        }
    }


    // GET PRODUCT BY ID
    async GetProductById(productId){
        try {
            const product = await this.repository.FindById(productId);
            return FormateData(product);

        } catch (err) {
            throw new APIError('Data Not found');
        }
    }
    
    
    // GET LIST OF PRODUCTS MATCHING IDS
    async GetSelectedProducts(selectedIds){
        try {
            const products = await this.repository.FindSelectedProducts(selectedIds);
            return FormateData(products);

        } catch (err) {
            throw new APIError('Data Not found');
        }
    }


    
    // GET PRODUCTS BY CATEGORY
    async GetProductsByCategory(category){
        try {
            const products = await this.repository.FindByCategory(category);
            return FormateData(products);

        } catch (err) {
            throw new APIError('Data Not found');
        }
    }

}

module.exports = ProductService;