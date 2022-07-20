const {CustomerRepository} = require("../database");
const {FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword} = require('../utils');
const {APIError, BadRequestError, STATUS_CODES} = require('../utils/app-errors')
const {error} = require("winston");
const ResponseHandler = require("../utils/reponse-handler");
const res = require("express/lib/response");


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
                    return FormateData({id: existingCustomer._id, token });
                }else{
                    throw new APIError('API Error', STATUS_CODES.UN_AUTHORISED_CREDENTIALS, 'Invalid Customer credentials !')
                }
            }

            return FormateData(null);

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

    async AddNewAddress(_id,userInputs){

        const { street, postalCode, city,country} = userInputs;

        try {
            const addressResult = await this.repository.CreateAddress({ _id, street, postalCode, city,country})
            return FormateData(addressResult);

        } catch (err) {
            throw err
        }


    }

}

module.exports = CustomerService;