function beerinoRepository (connection) {
    this._connection = connection;
}

beerinoRepository.prototype.get = function(beerinoId, callback) {
    this._connection.query('SELECT beerinoId, name, description, userId FROM beerino', callback);
}

beerinoRepository.prototype.save = function(beerino, callback) {
     this._connection.query('INSERT INTO beerino SET ? ON DUPLICATE KEY UPDATE ?', [beerino, beerino], callback);
}

beerinoRepository.prototype.list = function(pagingConfig, callback) {
    this._connection.query('SELECT beerinoId, name, description, userId FROM beerino LIMIT ?,?', [pagingConfig.page, pagingConfig.limit], callback);
}

beerinoRepository.prototype.list = function(beerinoId, callback) {
    this._connection.query('DELETE FROM beerino WHERE beerinoId = ?', beerinoId, callback);
}

module.exports = function () {
    return beerinoRepository;
};
