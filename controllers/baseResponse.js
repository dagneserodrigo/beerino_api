module.exports = function(app) {
    app.errorResponse = function(errors) {
        return errors.map((error) => {
            return {
                valido: false,
                message: error.msg
            };
        });
    };

    app.successResponse = function(data) {
        console.log(data);
        return data.map((result) => {
            return {
                valido: true,
                data: result
            };
        });
    };
};