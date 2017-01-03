function userRepository (oConnection) {
    this._oConnection = oConnection;
}

userRepository.prototype.getTemperature = function (sColumnName, sBeerinoId, fnCallback) {
    var fnIterateSingleColumn = function (sItem) {
        sResult = sItem.hasOwnProperty(sColumnName) ? String(sItem[sColumnName]) : "";
    };
    var sResult = "";
    var aParams = [sBeerinoId];
    // The query glitches when using PS for the column name
    this._oConnection("SELECT " + sColumnName + " FROM Beerino WHERE beerinoUserId = $1::int", aParams,
        function (oResult, oError) {
            if (oError) {
                fnCallback();
            } else {
                oResult.rows.forEach(fnIterateSingleColumn);
                sResult ? fnCallback(sResult) : fnCallback();
            }
        }
    );
};


userRepository.prototype.setTemperature = function (sColumnName, sBeerinoId, sActualTemperature, fnCallback) {
    var aParams = [sBeerinoId, sActualTemperature];
    this._oConnection("UPDATE Beerino SET " + sColumnName + " = $2::int WHERE beerinoUserId = $1::int", aParams,
        function (oResult, oError) {
            if (oError) {
                fnCallback();
            } else {
                fnCallback(oResult);
            }
        });
};

userRepository.prototype.toggleRelay = function (callback) {
    this._connection.query("PLACEHOLDER", callback);
    // TODO create query once database info is available
};

module.exports = function () {
    return userRepository;
};
