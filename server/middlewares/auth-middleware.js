const ApiError = require('../exeptions/api-error')

module.exports = function (req, res, next){
    try {
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedError())
        }
    }catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}