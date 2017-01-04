module.exports = function (app) {
    app.get("/user/:userId", function (req, res) {
        var connection = app.repository.connectionFactory();
        var userRepository = new app.repository.userRepository(connection);
        
        userRepository.get(req.params.userId, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).json(result);
            }
        });
    });

    
};
