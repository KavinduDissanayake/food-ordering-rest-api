const { CustomerModel,AddressModel } = require('../models');
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
                address: "",
                avatarUrl:'https://ui-avatars.com/api/?name='+firstName+'%'+lastName,
            })
            const customerResult = await customer.save();

            return customerResult;

        }catch(err){
            throw  new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer')
        }
    }

    async FindCustomer({ email }){
        try{
            const existingCustomer = await CustomerModel.findOne({ email: email });
            return existingCustomer;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer')
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
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer');
        }
    }

    async EditProfile({id},{firstName,lastName ,address}){

        try{
            const profile = await CustomerModel.findById(id);


            if(profile){
                profile.firstName =  firstName
                profile.lastName =  lastName
                profile.address =  address
            }

            return await profile.save();

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Update Profile')
        }
    }

    async UpdateAvtar({id},{imageUrl}){

        try{
            const profile = await CustomerModel.findById(id);


            if(profile){
                profile.avatarUrl =  imageUrl
            }

            return await profile.save();

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Profile Image')
        }
    }


    async Wishlist(customerId){
        try{
            const profile = await CustomerModel.findById(customerId).populate('wishlist');

            return profile.wishlist;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Wishlist ')
        }
    }
    
    async AddWishlistItem(customerId, product){
        
        try{
            const profile = await CustomerModel.findById(customerId).populate('wishlist');
           
            if(profile){
    
                 let wishlist = profile.wishlist;
      
                if(wishlist.length > 0){
                    let isExist = false;
                    wishlist.map(item => {
                        if(item._id.toString() === product._id.toString()){
                           const index = wishlist.indexOf(item);
                           wishlist.splice(index,1);
                           isExist = true;
                        }
                    });
    
                    if(!isExist){
                        wishlist.push(product);
                    }
    
                }else{
                    wishlist.push(product);
                }
    
                profile.wishlist = wishlist;
            }
    
            const profileResult = await profile.save();
            console.log(profileResult);


            return profileResult.wishlist;

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Add to WishList')
        }

    }


    async RemoveWishlistItem(customerId, product){
        
        try{
            const profile = await CustomerModel.findById(customerId).populate('wishlist');
           
            if(profile){
    
                 let wishlist = profile.wishlist;
      
                if(wishlist.length > 0){
                    let isExist = false;
                    wishlist.map(item => {
                        if(item._id.toString() === product._id.toString()){
                           const index = wishlist.indexOf(item);
                           wishlist.splice(index,1);
                           isExist = true;
                        }
                    });
    
                    if(!isExist){
                        wishlist.push(product);
                    }
    
                }else{
                    wishlist.push(product);
                }
    
                profile.wishlist = wishlist;
            }
    
            const profileResult = await profile.save();      
    
            return profileResult.wishlist;

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Add to WishList')
        }

    }
}

module.exports = CustomerRepository;