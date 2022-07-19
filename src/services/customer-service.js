const {CustomerRepository} = require("../database");
const {FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword} = require('../utils');
const {APIError, BadRequestError} = require('../utils/app-errors')
const {error} = require("winston");
const ResponseHandler = require("../utils/reponse-handler");
const res = require("express/lib/response");


// All Business logic will be here
class CustomerService {

    constructor() {
        this.repository = new CustomerRepository();
    }


    async SignUp(userInputs) {

        const {email, password, phone} = userInputs;


        try{
            // create salt
            let salt = await GenerateSalt();

            let userPassword = await GeneratePassword(password, salt);

            const existingCustomer = await this.repository.CreateCustomer({email, password: userPassword, phone, salt});

            const token = await GenerateSignature({ email: email, _id: existingCustomer._id});

            return FormateData({user_id: existingCustomer._id,accessToken:token});

        }catch(err){
            throw new APIError('Data Not found', err)
        }

    }

}

module.exports = CustomerService;