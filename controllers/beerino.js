var randomstring = require("randomstring");

module.exports = function (app) {    

    app.get('/beerino/:beerinoId', function(req, res) {
        var connection = app.repository.connectionFactory();
        var beerinoRepository = new app.repository.beerinoRepository(connection);
        
        beerinoRepository.get(req.params.beerinoId, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).json(result);
            }
        });
    });

    app.post('/beerino', function (req, res) {
        var connection = app.repository.connectionFactory();
        var beerinoRepository = new app.repository.beerinoRepository(connection);
        var beerino = req.body;

        beerinoRepository.save(beerino, function (error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).json(result);
            }
        });
    });

    app.post('/beerinos', function(req, res) {
        var connection = app.repository.connectionFactory();
        var userConnection = app.repository.connectionFactory();
        var beerinoRepository = new app.repository.beerinoRepository(connection);
        var userRepository = new app.repository.userRepository(connection);
        var options = req.body;
        var userNotFoundMessage = {mensagem: 'usuário não encontrado.'};

        userRepository.getByEmail(options.userEmail, function(error, userResult) {
            if (error) {
                return res.status(500).send(error);
            }

            if (!userResult.length) {
                //alterar response state
                return res.status(500).json(userNotFoundMessage);
            }

            beerinoRepository.list(userResult[0].userId, function(error, beerinoResult) {
                if (error) {
                    return res.status(500).send(error);
                }
                
                if (!beerinoResult.length) {
                    //alterar response state
                    return res.status(500).json(userNotFoundMessage);
                }

                res.status(201).json(beerinoResult);
            });
        })
    });

    app.delete('/beerino/:beerinoId', function(req, res) {
        var connection = app.repository.connectionFactory();
        var beerinoRepository = new app.repository.beerinoRepository(connection);
        
        beerinoRepository.delete(req.params.beerinoId, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).json(result);
            }
        });
    });

    app.get('/beerino/generate/identifier', function(req, res) { 
        var connection = app.repository.connectionFactory();
        var beerinoRepository = new app.repository.beerinoRepository(connection);
        var identifier = randomstring.generate();

        beerinoRepository.get(identifier, function(error, result) {
            if (error) {
                res.send(null);
            } else {
                if (!!result.length) {
                    var duplicatedIdentifier = identifier;
                    while(identifier == duplicatedIdentifier) {
                        identifier = randomstring.generate();
                    }
                }

                res.send(identifier);
            }
        });
    });
};
