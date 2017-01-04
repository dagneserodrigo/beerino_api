function beerRepository (connection) {
    this._connection = connection;
}

beerRepository.prototype.get = function (beerId, callback) {
    this._connection.query("SELECT beerId, name, drescription, recipe, public, userId from beer WHERE beerId = ?", beerId, callback);
};

beerRepository.prototype.save = function (beer, callback) {
    this._connection.query("INSERT INTO beer SET ? ON DUPLICATE KEY UPDATE ?", [beer, beer], callback);
};

module.exports = function () {
    return beerRepository;
};
