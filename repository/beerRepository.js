function beerRepository (connection) {
    this._connection = connection;
}

beerRepository.prototype.save = function (beerino, callback) {
    this._connection.query("INSERT INTO Beerino SET ?", beerino, callback);
};

beerRepository.prototype.getRecipeById = function (callback) {
    this._connection.query("PLACEHOLDER", callback);
    // TODO create query once database info is available
};

beerRepository.prototype.searchRecipe = function (callback) {
    this._connection.query("PLACEHOLDER", callback);
    // TODO create query once database info is available
};

beerRepository.prototype.delete = function (callback) {
    this._connection.query("PLACEHOLDER", callback);
    // TODO create query once database info is available
};

module.exports = function () {
    return beerRepository;
};
