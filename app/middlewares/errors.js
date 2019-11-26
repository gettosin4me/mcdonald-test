import ResponseTransformer from '../utils/ResponseTransformer';

const errors = (err, req, res, next) => {
    console.log(err);
    switch (err.name || err.error.name) {
            case 'BadRequest':
                ResponseTransformer.error(req, res, err);
                break;
            case 'Conflict':
                ResponseTransformer.error(req, res, err);
                break;
            case 'NotFound':
                ResponseTransformer.error(req, res, err);
                break;
            case 'Unauthorize':
                ResponseTransformer.error(req, res, err);
                break;
            case 'MethodNotAllowed':
                ResponseTransformer.error(req, res, err);
                break;
            case 'MongoError':
                ResponseTransformer.mongo_error(req, res, err);
                break;
            case 'ValidationError':
                ResponseTransformer.validation_error(req, res, err);
                break;
            default:
                ResponseTransformer.error(req, res, err);
    }
};

module.exports = errors;
