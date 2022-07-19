const { CustomerModel } = require('../models');
const { APIError, BadRequestError, STATUS_CODES } = require('../../utils/app-errors')

//Dealing with database operations
class CustomerRepository {

    async CreateCustomer({ email, password, firstName,lastName, salt }){
        try{
            const customer = new CustomerModel({
                email,
                password,
                salt,
                firstName,
                lastName,
                address: [],
            })
            const customerResult = await customer.save();
            return customerResult;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer')
        }
    }

    async FindCustomer({ email }){
        try{
            const existingCustomer = await CustomerModel.findOne({ email: email });
            return existingCustomer;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer')
        }
    }

    async FindCustomerById({ id }){

        try {
            const existingCustomer = await CustomerModel.findById(id);
                // .populate('address')
                // .populate('wishlist')
                // .populate('orders')
                // .populate('cart.product');
            return existingCustomer;
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer');
        }
    }

}

module.exports = CustomerRepository;