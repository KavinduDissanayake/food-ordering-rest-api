const { ProductRepository } = require("../database");
const { FormateData,FormateDataProductList } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class ProductService {

    constructor(){
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs){
        try{
            const productResult = await this.repository.CreateProduct(productInputs)
            return FormateData(productResult);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
    
    async GetProducts(){
        try{
            const products = await this.repository.Products();
    
            let categories = {};
    
            products.map(({ type }) => {
                categories[type] = type;
            });
            
            return FormateData({
                products,
                categories:  Object.keys(categories) ,
            })

        }catch(err){
            throw new APIError('Data Not found')
        }
    }


    async GetProductDescription(productId){
        try {
            const product = await this.repository.FindById(productId);
            return FormateData(product)
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetProductsByCategory(category){
        try {
            const products = await this.repository.FindByCategory(category);
            return FormateData(products)
        } catch (err) {
            throw new APIError('Data Not found')
        }

    }

    async GetSelectedProducts(selectedIds){
        try {
            const products = await this.repository.FindSelectedProducts(selectedIds);
            console.log(products)
            return FormateData(products);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetProductById(productId){
        try {
            return await this.repository.FindById(productId);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetProductPayload(userId, { productId, qty}, event) {
        
        const product = await this.repository.FindById(productId);

        if(product){
            const payload = {
                event: event,
                data: { userId, product, qty}
            }
            return FormateData(payload)
        }else{
            return FormateData({error: 'No product available'})
        }


    }



    async GetWishlistProducts(productList){
      

        try {
            const products = await this.repository.FindSelectedProducts(productList);
            console.log(products)

        
            return FormateDataProductList(products);


            
        } catch (err) {
            throw err;
        }

    }

    async SubscribeEvents(payload){
 
        const { event, data } =  payload;

        switch(event){
            case 'GET_PRODUCT_LIST':
                this.GetWishlistProducts(data);
                break;
            default:
                break;
        }
 
    }
     
}

module.exports = ProductService;