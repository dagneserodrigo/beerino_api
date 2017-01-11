module.exports = function(app) {
    app.errorResponse = function(errors) {

        var response = {
            valid: false
        };

        if (errors.constructor === Array) {
            response.message = errors.map((error) => { return error.msg});
        } else {
            response.message = errors.code || errors.message;
        }

        return response;
    };

    app.successResponse = function(result) {
        console.log(result);
        var response = {
            valid: true
        };

        if (result.constructor === Array) {

            if (result.length > 1) {
                response.data = result.map((item) => { 
                    return item
                });
            } else {
                response.data = result.shift();
            }

        } else {
            response.data = result;
        }
       
        return response;
    };
};