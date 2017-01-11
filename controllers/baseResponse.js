module.exports = function(app) {
    app.errorResponse = function(errors) {
        return errors.map((error) => {
            return {
                valid: false,
                message: error.msg
            };
        });
    };

    app.successResponse = function(data) {
        return data.map((result) => {
            return {
                valid: true,
                data: result
            };
        });
    };
};