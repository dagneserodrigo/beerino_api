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

    app.post('/beerinos/:page/:limit', function(req, res) {
        var connection = app.repository.connectionFactory();
        var beerinoRepository = new app.repository.beerinoRepository(connection);
        var options = req.body;

        beerinoRepository.list(options.userId, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).json(result);
            }
        });
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
