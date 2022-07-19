const { CustomerModel } = require('../models');
const { APIError, BadRequestError, STATUS_CODES } = require('../../utils/app-errors')

//Dealing with database operations
class CustomerRepository {

    async CreateCustomer({ email, password, phone, salt }){
        try{
            const customer = new CustomerModel({
                email,
                password,
                salt,
                phone,
                address: [],
            })
            const customerResult = await customer.save();
            return customerResult;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer')
        }
    }

}

module.exports = CustomerRepository;