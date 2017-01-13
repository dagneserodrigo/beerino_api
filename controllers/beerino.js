var randomstring = require("randomstring");

module.exports = function (app) {    

    app.get('/beerino/:beerinoId', function(req, res) {
        var connection = app.repository.connectionFactory();
        var beerinoRepository = new app.repository.beerinoRepository(connection);
        
        req.check('beerinoId', 'Identificador do Beerino Inválido').notEmpty().isLength(10);

        req.getValidationResult().then(function(errors) {
            if (errors.array().length) {
                return res.status(400).json(app.errorResponse(errors.array()));
            }

            beerinoRepository.get(req.params.beerinoId, function(error, result) {
                if (error) {
                    return res.status(500).json(app.errorResponse(error));
                }
                
                return res.status(404).json(app.errorResponse({message: 'Não está sendo possível achar seu berrino no momento, senhor.'}));

                return res.status(201).json(app.successResponse(result));
            });
        });
    });

    app.post('/beerino', function (req, res) {
        var connection = app.repository.connectionFactory();
        var beerinoRepository = new app.repository.beerinoRepository(connection);
        var beerino = req.body;

        beerinoRepository.get(beerino.beerinoId, function(error, getResult) {
            if (error) {
                return res.status(500).json(app.errorResponse(error)); 
            }

            if (getResult.length) {
                var errors = { message: "Já existe um Beerino com essa identificação" };
                return res.status(404).json(app.errorResponse(errors));
            }

            beerinoRepository.save(beerino, function (error, saveResult) {
                if (error) {
                    return res.status(500).json(app.errorResponse(error));
                }

                beerinoRepository.get(beerino.beerinoId, function(error, result) {
                    if (error) {
                        return res.status(500).json(app.errorResponse(error));
                    }

                    res.status(201).json(app.successResponse(result));
                });
            });
        });
    });

    app.post('/beerinos', function(req, res) {
        var connection = app.repository.connectionFactory();
        var userConnection = app.repository.connectionFactory();
        var beerinoRepository = new app.repository.beerinoRepository(connection);
        var userRepository = new app.repository.userRepository(connection);
        var options = req.body;
        var userNotFoundMessage = { message: 'usuário não encontrado.' };

        userRepository.get(options.userEmail, function(error, userResult) {
            if (error) {
                return res.status(500).json(app.errorResponse(error));
            }

            if (!userResult.length) {
                return res.status(404).json(app.errorResponse(userNotFoundMessage));
            }

            beerinoRepository.list(userResult[0].userId, function(error, beerinoResult) {
                if (error) {
                    return res.status(500).json(app.errorResponse(error));
                }
                
                if (!beerinoResult.length) {
                    return res.status(404).json(app.errorResponse(userNotFoundMessage));
                }

                res.status(201).json(app.successResponse(beerinoResult));
            });
        })
    });

    app.delete('/beerino/:beerinoId', function(req, res) {
        var connection = app.repository.connectionFactory();
        var beerinoRepository = new app.repository.beerinoRepository(connection);
        
        beerinoRepository.delete(req.params.beerinoId, function(error, result) {
            if (error) {
                res.status(500).json(app.errorResponse(error));
            } else {
                res.status(201).json(app.successResponse(result));
            }
        });
    });

    app.get('/beerino/generate/identifier', function(req, res) { 
        var connection = app.repository.connectionFactory();
        var beerinoRepository = new app.repository.beerinoRepository(connection);

        getBeerinoIdentifier(beerinoRepository, getBeerinoIdentifier, res);
    });

    function getBeerinoIdentifier(beerinoRepository, callback, res) {
        var identifier = randomstring.generate(10);
        beerinoRepository.get(identifier, function(error, result) {
            if (error || result.length) {
                callback(beerinoRepository, getBeerinoIdentifier, res);
            }

            res.status(201).send(identifier);
        });
    }

    app.post('/beerino/temperature', function(req, res) {
        var connection = app.repository.connectionFactory();
        var beerinoRepository = new app.repository.beerinoRepository(connection);
        var beerino = req.body;

        beerinoRepository.updateTemperature(beerino, function(error, result) {
            if (error) {
                res.status(404).json(app.errorResponse(error));
            } else {
                res.status(201).json(app.successResponse(result));
            }
        });
    });
};
