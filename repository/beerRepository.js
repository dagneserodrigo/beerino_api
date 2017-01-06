function beerRepository (connection) {
    this._connection = connection;
}

beerRepository.prototype.get = function (beerId, callback) {
    this._connection.query("SELECT beerId, name, drescription, recipe, public, userId FROM beer WHERE beerId = ?", beerId, callback);
};

beerRepository.prototype.save = function (beer, callback) {
    this._connection.query("INSERT INTO beer SET ? ON DUPLICATE KEY UPDATE ?", [beer, beer], callback);
};

beerRepository.prototype.list = function (userId, callback) {
    // this._connection.query("SELECT beerId, name, drescription, recipe, public, userId FROM beer LIMIT ?,?", [pagingConfig.page, pagingConfig.limit], callback);
    this._connection.query("SELECT beerId, name, drescription, recipe, public, userId FROM beer WHERE userId = ?", userId, callback);
};

beerRepository.prototype.delete = function (beerId, callback) {
    this._connection.query("DELETE FROM beer WHERE beerId = ?", beerId, callback);
};

module.exports = function () {
    return beerRepository;
};
