const { ValidateSignature } = require('../../utils');
const ResponseHandler = require("../../utils/reponse-handler");

module.exports = async (req,res,next) => {
    
    const isAuthorized = await ValidateSignature(req);

    if(isAuthorized){
        return next();
    }
    return  ResponseHandler(res,403,'Not Authorized',[])
}