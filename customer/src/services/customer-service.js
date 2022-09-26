const {CustomerRepository} = require("../database");
const {FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword} = require('../utils');
const {APIError, BadRequestError, STATUS_CODES} = require('../utils/app-errors')


// All Business logic will be here
class CustomerService {

    constructor() {
        this.repository = new CustomerRepository();
    }

    async SignIn(userInputs){

        const { email, password } = userInputs;

        try {

            const existingCustomer = await this.repository.FindCustomer({ email});

            if(existingCustomer){

                const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);

                if(validPassword){
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id});

                    existingCustomer["accessToken"] = token
                    return FormateData({existingCustomer});

                }else{
                    throw new APIError('API Error', STATUS_CODES.UN_AUTHORISED_CREDENTIALS, 'Invalid Customer Password !')
                }
            }else {
                throw new APIError('API Error', STATUS_CODES.UN_AUTHORISED_CREDENTIALS, 'Invalid Customer Email !')

            }

            // return FormateData(null);

        } catch (err) {
            throw err
        }

    }

    async SignUp(userInputs) {

        const {email, password, firstName,lastName} = userInputs;


        try{
            // create salt
            let salt = await GenerateSalt();

            let userPassword = await GeneratePassword(password, salt);

            const existingCustomer = await this.repository.CreateCustomer({email, password: userPassword, firstName,lastName, salt});

            const token = await GenerateSignature({ email: email, _id: existingCustomer._id});

            existingCustomer["accessToken"] = token
            return FormateData( existingCustomer);

        }catch(err){
            throw err
        }

    }

    async GetProfile(id){

        try {
            const existingCustomer = await this.repository.FindCustomerById({id});
            return FormateData(existingCustomer);

        } catch (err) {
            throw err
        }
    }

    async EditProfile(id,userInputs){
        const { firstName,lastName ,address} = userInputs;

        try {
            const existingCustomer = await this.repository.EditProfile({id}, { firstName,lastName ,address})


            return FormateData(existingCustomer);

        } catch (err) {
            throw err
        }
    }

    async UpdateAvtar(id,userInputs){
        const { imageUrl } = userInputs;

        try {
            const existingCustomer = await this.repository.UpdateAvtar({id}, { imageUrl})


            return FormateData(existingCustomer);

        } catch (err) {
            throw err
        }
    }

    async AddToWishlist(customerId, product){
        try {
            const wishlistResult = await this.repository.AddWishlistItem(customerId, product);        
           return FormateData(wishlistResult);
    
        } catch (err) {
            throw err
        }
    }

    async ManageCart(customerId, product, qty, isRemove){
        try {
            const cartResult = await this.repository.AddCartItem(customerId, product, qty, isRemove);       

            return FormateData(cartResult);
        } catch (err) {

          //  throw err
        }
    }

    async ManageOrder(customerId, order){
        try {
            const orderResult = await this.repository.AddOrderToProfile(customerId, order);
            return FormateData(orderResult);
        } catch (err) {
            throw err 
        }
    }


    async GetWishList(customerId){

        try {
            const wishListItems = await this.repository.Wishlist(customerId);
            return FormateData(wishListItems);
        } catch (err) {
            throw err
        }
    }




    async SubscribeEvents(payload){
 
        const { event, data } =  payload;
        const { userId, product, order, qty } = data;

        switch(event){
            case 'ADD_TO_WISHLIST':
                this.AddToWishlist(userId,product)
                break;
            case 'REMOVE_FROM_WISHLIST':
                this.AddToWishlist(userId,product)
                break;
            case 'ADD_TO_CART':
                this.ManageCart(userId,product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId,product,qty, true);
                break;
            case 'CREATE_ORDER':
                this.ManageOrder(userId,order);
                break;
            default:
                break;
        }
 
    }

}

module.exports = CustomerService;