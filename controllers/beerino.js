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
        console.log(beerino);
        beerinoRepository.save(beerino, function (error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).json(result);
            }
        });
    });

    app.get('/beerino', function(req, res) {
        var connection = app.repository.connectionFactory();
        var beerinoRepository = new app.repository.beerinoRepository(connection);
        var pagingConfig = {
            page: req.params.page,
            limit: req.params.limit
        };

        beerinoRepository.list(pagingConfig, function(error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(201).json(result);
            }
        });
    })

    // app.post("/beerino/register/:userId/:beerinoUserId", function (oRequest, oResponse) {
    //     var oConnection = app.repository.connectionFactory();
    //     var beerinoRepository = new app.repository.beerinoRepository(oConnection);
    //     var sUserId = oRequest.params["userId"] ? oRequest.params["userId"] : oResponse.status(400).return;
    //     var sBeerinoUserId = oRequest.params["beerinoUserId"] ? oRequest.params["beerinoUserId"] : oResponse.status(400).return;
    //     beerinoRepository.addDevToAcc(sUserId, sBeerinoUserId, function (oResult, oError) {
    //         if (oError) {
    //             oResponse.status(500).send(oError);
    //         } else {
    //             if (!oResponse.headersSent) {
    //                 oResponse.set("Content-type", "application/json");
    //                 oResponse.status(200).json("success");
    //             }
    //         }
    //     });
    //     oResponse.json(oRequest.body);
    // });

    // app.post("/beerino/remove/:userId/:beerinoUserId", function (oRequest, oResponse) {
    //     var oConnection = app.repository.connectionFactory();
    //     var beerinoRepository = new app.repository.beerinoRepository(oConnection);
    //     var sUserId = oRequest.params["userId"] ? oRequest.params["userId"] : oResponse.status(400).return;
    //     var sBeerinoUserId = oRequest.params["beerinoUserId"] ? oRequest.params["beerinoUserId"] : oResponse.status(400).return;
    //     beerinoRepository.rmDevFromAcc(sUserId, sBeerinoUserId, function (oResult, oError) {
    //         if (oError) {
    //             oResponse.status(500).send(oError);
    //         } else {
    //             if (!oResponse.headersSent) {
    //                 oResponse.set("Content-type", "application/json");
    //                 oResponse.status(200).json("success");
    //             }
    //         }
    //     });
    //     oResponse.json(oRequest.body);
    // });

    // app.post("/beerino/registerDevice/:name/:beerinoUserId", function (oRequest, oResponse) {
    //     var oConnection = app.repository.connectionFactory();
    //     var beerinoRepository = new app.repository.beerinoRepository(oConnection);
    //     var sName = oRequest.params["name"] ? oRequest.params["name"] : oResponse.status(400).return;
    //     var sBeerinoUserId = oRequest.params["beerinoUserId"] ? oRequest.params["beerinoUserId"] : oResponse.status(400).return;
    //     beerinoRepository.registerDevice(sName, sBeerinoUserId, function (oResult, oError) {
    //         if (oError) {
    //             oResponse.status(500).send(oError);
    //         } else {
    //             if (!oResponse.headersSent) {
    //                 oResponse.set("Content-type", "application/json");
    //                 oResponse.status(200).json("success");
    //             }
    //         }
    //     });
    //     oResponse.json(oRequest.body);
    // });

    // app.get("/beerino/task/:beerinoId/:taskId", function (oRequest, oResponse) {
    //     oResponse.set("Content-Type", "text/plain");
    //     oResponse.send(new Buffer("1946/1200000/12/10"));
    // });

    // app.get("/beerino/data/:userId/getUserDevices", function (oRequest, oResponse) {
    //     var oConnection = app.repository.connectionFactory();
    //     var oUserRepository = new app.repository.userRepository(oConnection);
    //     var sUserId = oRequest.params["userId"] ? oRequest.params["userId"] : oResponse.status(400).return;
    //     oUserRepository.getUserDevices(sUserId, function (oResult, oError) {
    //         if (oError) {
    //             oResponse.status(500).send(oError);
    //         } else {
    //             if (!oResponse.headersSent) {
    //                 oResponse.set("Content-type", "application/json");
    //                 oResponse.status(200).json(oResult);
    //             }
    //         }
    //     });
    // });

    // app.get("/beerino/chave-registro", function (oRequest, oResponse) {
    //     oResponse.set("Content-Type", "text/plain");
    //     oResponse.send(new Buffer("Z9GJKsWr"));
    // });
};
