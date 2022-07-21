const { ValidateSignature } = require('../../utils');
const ResponseHandler = require("../../utils/reponse-handler");

module.exports = async (req,res,next) => {
    try {
        const isAuthorized = await ValidateSignature(req);
        if(isAuthorized){
            return next();
        }

    }catch (err) {
        ResponseHandler(res,403,'Access Token Expired ! ',[])
    }
}