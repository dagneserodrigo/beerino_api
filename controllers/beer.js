module.exports = function(app) {
    app.get('/beer/:beerId', function(req, res) {
        var connection = app.repository.connectionFactory();
        var beerRepository = new app.repository.beerRepository(connection);

        beerRepository.get(req.params.beerId, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).send(result.shift());
            }
        });
    });

    app.post('/beer', function(req, res) {
        var connection = app.repository.connectionFactory();
        var beerRepository = new app.repository.beerRepository(connection);
        var beer = req.body;

        beerRepository.save(beer, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).send(result);
            }
        });
    });

    app.post('/beers', function(req, res) {
        var connection = app.repository.connectionFactory();
        var userConnection = app.repository.connectionFactory();
        var beerRepository = new app.repository.beerRepository(connection);
        var userRepository = new app.repository.userRepository(connection);
        var options = req.body;
        var userNotFoundMessage = {mensagem: 'usuário não encontrado.'};

        userRepository.get(options.userEmail, function(error, userResult) {
            if (error) {
                return res.status(500).send(error);
            }

            if (!userResult.length) {
                return res.status(404).json(userNotFoundMessage);
            }

            beerRepository.list(userResult[0].userId, function(error, beerResult) {
                if (error) {
                    return res.status(500).send(error);
                }
                
                if (!beerResult.length) {
                    return res.status(404).json(userNotFoundMessage);
                }

                res.status(201).json(beerResult);
            });
        })
    });

    app.delete('/beer/:beerId', function(req, res) {
        var connection = app.repository.connectionFactory();
        var beerRepository = new app.repository.beerRepository(connection);

        beerRepository.delete(req.params.beerId, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).send(result);
            }
        });
    });
};