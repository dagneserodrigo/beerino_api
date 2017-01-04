function beerRepository (connection) {
    this._connection = connection;
}

beerRepository.prototype.get = function (beerId, callback) {
    this._connection.query("SELECT beerId, name, drescription, recipe, public, userId FROM beer WHERE beerId = ?", beerId, callback);
};

beerRepository.prototype.save = function (beer, callback) {
    this._connection.query("INSERT INTO beer SET ? ON DUPLICATE KEY UPDATE ?", [beer, beer], callback);
};

beerRepository.prototype.list = function (pagingConfig, callback) {
    this._connection.query("SELECT beerId, name, drescription, recipe, public, userId from beer LIMIT ?,?", [pagingConfig.page, pagingConfig.limit], callback);
};

beerRepository.prototype.delete = function (beerId, callback) {
    this._connection.query("DELETE FROM beer WHERE beerId = ?", beerId, callback);
};

module.exports = function () {
    return beerRepository;
};
