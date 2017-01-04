module.exports = function(app) {
    app.get('beer/:beerId', function(req, res) {
        var connection = app.repository.connectionFactory();
        var beerRepository = new app.repository.beerRepository(connection);

        beerRepository.get(req.params.beerId, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).send(result);
            }
        });
    });

    app.post('beer', function(req, res) {
        var connection = app.repository.connectionFactory();
        var beerRepository = new app.repository.beerRepository(connection);
        var beer = req.body;

        beerRepository.get(beer, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).send(result);
            }
        });
    });

    app.get('beers/:page/:limit', function(req, res) {
        var connection = app.repository.connectionFactory();
        var beerRepository = new app.repository.beerRepository(connection);
        var pagingConfig = {
            page: req.params.page,
            limite: req.params.limit
        };

        beerRepository.list(pagingConfig, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).send(result);
            }
        });
    });
};