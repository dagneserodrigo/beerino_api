module.exports = function (app) {
    app.get("/temperature", function (request, response) {
        // TO-DO: pegar infomações do banco
        response.send("80");
    });

    app.post("/temperature", function (request, response) {
        // TO-DO: salvar temperatura no banco
        response.send("ok");
    });

    app.post("/turnreleon", function (request, response) {
        // TO-DO: ligar/desligar relé
        response.send("ok");
    });

    app.get("/beerino/data/:beerinoId/getTemperature", function (oRequest, oResponse) {
        var sColumnName = "actualtemperature";
        var oConnection = app.repository.connectionFactory();
        var oUserRepository = new app.repository.userRepository(oConnection);
        var sBeerinoId = oRequest.params["beerinoId"] ? oRequest.params["beerinoId"] : oResponse.status(400).return;
        oUserRepository.getTemperature(sColumnName, sBeerinoId, function (oResult, oError) {
            if (oError) {
                oResponse.status(500).send(oError);
            } else {
                if (!oResponse.headersSent) {
                    oResponse.set("Content-type", "application/json");
                    oResponse.status(200).json(oResult);
                }
            }
        });
    });

    app.post("/beerino/data/:beerinoId/setTemperature/:actualTemperature", function (oRequest, oResponse) {
        var sColumnName = "actualTemperature";
        var oConnection = app.repository.connectionFactory();
        var oUserRepository = new app.repository.userRepository(oConnection);
        var sBeerinoId = oRequest.params["beerinoId"] ? oRequest.params["beerinoId"] : oResponse.status(400).return;
        var sActualTemperature = oRequest.params["actualTemperature"] ? oRequest.params["actualTemperature"] : oResponse.status(400).return;
        oUserRepository.setTemperature(sColumnName, sBeerinoId, sActualTemperature,
            function (oResult, oError) {
                if (oError) {
                    oResponse.status(500).send(oError);
                } else {
                    if (!oResponse.headersSent) {
                        oResponse.set("Content-type", "application/json");
                        oResponse.status(200).json("success");
                    }
                }
            });
    });

};
