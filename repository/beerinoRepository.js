function beerinoRepository (connection) {
    this._connection = connection;
}

beerinoRepository.prototype.get = function(beerinoId, callback) {
    this._connection.query('SELECT beerinoId, name, description FROM beerino', callback);
}

beerinoRepository.prototype.save = function(beerino, callback) {
     this._connection.query('INSERT INTO beerino SET ? ON DUPLICATE KEY UPDATE ?', [beerino, beerino], callback);
}


// beerinoRepository.prototype.addDevToAcc = function (sUserId, sBeerinoUserId, fnCallback) {
//     var aParams = [sUserId, sBeerinoUserId];
//     this._oConnection("query pending", aParams,
//         function (oResult, oError) {
//             if (oError) {
//                 fnCallback();
//             } else {
//                 fnCallback(oResult);
//             }
//         }
//     );
// };

// beerinoRepository.prototype.rmDevFromAcc = function (sUserId, sBeerinoUserId, fnCallback) {
//     var aParams = [sUserId, sBeerinoUserId];
//     this._oConnection("query pending", aParams,
//         function (oResult, oError) {
//             if (oError) {
//                 fnCallback();
//             } else {
//                 fnCallback(oResult);
//             }
//         }
//     );
// };

// beerinoRepository.prototype.registerDevice = function (sName, sBeerinoUserId, fnCallback) {
//     var aParams = [sName, sBeerinoUserId];
//     this._oConnection("query pending", aParams,
//         function (oResult, oError) {
//             if (oError) {
//                 fnCallback();
//             } else {
//                 fnCallback(oResult);
//             }
//         }
//     );
// };

// beerinoRepository.prototype.getUserDevices = function (sName, fnCallback) {
//     var aParams = [sName];
//     this._oConnection("query pending", aParams,
//         function (oResult, oError) {
//             if (oError) {
//                 fnCallback();
//             } else {
//                 fnCallback(oResult);
//             }
//         }
//     );
// };

module.exports = function () {
    return beerinoRepository;
};
