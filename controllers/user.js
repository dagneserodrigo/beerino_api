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

    app.post("/user", function (req, res) {
        var connection = app.repository.connectionFactory();
        var userRepository = new app.repository.userRepository(connection);
        var user = req.body;

        userRepository.save(user, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).json(result);
            }
        });
    });

    app.get("/users/:page/:limit", function (req, res) {
        var connection = app.repository.connectionFactory();
        var userRepository = new app.repository.userRepository(connection);
        var pagingConfig = {
            page: req.params.page,
            limit: req.params.limit
        };

        userRepository.list(pagingConfig, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).json(result);
            }
        });
    });
};
