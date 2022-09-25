const { ValidateSignature } = require('../../utils');
const ResponseHandler = require("../../utils/reponse-handler");

module.exports = async (req,res,next) => {
    
    const isAuthorized = await ValidateSignature(req);

    if(isAuthorized){
        return next();
    }else{
        ResponseHandler(res,403,'Access Token Expired ! ',[])

    }

}